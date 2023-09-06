import { useEffect, useState, useRef } from "react";
import { Button, Container, Form, Modal, Row, Col, Table } from "react-bootstrap";
import { useDownloadExcel } from "react-export-table-to-excel";
import { FaFileExcel } from 'react-icons/fa';
import { useReportContext } from "../components/shared/ReportContext.jsx";
import { useFormErrorContext } from '../components/shared/FormErrorContext.jsx';

const Reports = () => {

  const { formError, setFormError } = useFormErrorContext();
  const { checkListByIncome, checkIncomeList, setCheckIncomeList, 
    fetchCheckIncome, fetchCheckIncomeDates, fetchCheckIncomeList, fetchCheckIncomeListDates,
    checkListByExpense, checkExpenseList, setCheckExpenseList, 
    fetchCheckExpense, fetchCheckExpenseDates, fetchCheckExpenseList, fetchCheckExpenseListDates,
    checkListByActor, checkActorList, setCheckActorList, 
    fetchCheckActor, fetchCheckActorDates, fetchCheckActorList, fetchCheckActorListDates
  } = useReportContext();
  
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);
  const tableCheckIncomeRef = useRef(null);
  const tableCheckExpenseRef = useRef(null);
  const tableCheckActorRef = useRef(null);

  useEffect(() => {
    setFormError(""); // Clear previous form error on component mount
    // Clear previous values
    setCheckIncomeList([]); 
    setCheckExpenseList([]);
    setCheckActorList([]);
}, []);

  useEffect(() => {
    if (!dateFrom) {
      setDateFrom(localStorage.getItem('date_from'));
    }
    if (!dateTo) {
      setDateTo(localStorage.getItem('date_to'));
    }

    if (checkIncomeList.length === 0 || checkExpenseList.length === 0 || 
      checkActorList.length === 0) {
      if (dateFrom && dateTo) {
        fetchCheckIncomeListDates(dateFrom, dateTo)
        fetchCheckExpenseListDates(dateFrom, dateTo)
        fetchCheckActorListDates(dateFrom, dateTo)
      } else {
        fetchCheckIncomeList();
        fetchCheckExpenseList();
        fetchCheckActorList();
      }
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    if (modalTitle === "Details Check Income") {
      setSelectedRow(checkListByIncome);

    } else if (modalTitle === "Details Check Expense") {
      setSelectedRow(checkListByExpense);

    } else if (modalTitle === "Details Check Actor") {
      setSelectedRow(checkListByActor);
    }
  }, [modalTitle, checkListByIncome, checkListByExpense, checkListByActor]);

  useEffect(() => {
    if (!showModal) {
      handleModalHide();
    };
  }, [showModal]);

  const handleToggleModal = (title, forceClose = false) => {
    setShowModal((prevShowModal) => forceClose ? false : !prevShowModal);
    setModalTitle(title);
  };

  const handleModalHide = () => {
    setSelectedRow(null);

    setFormError("");
    setShowModal(false);
  };

  const applyParam = () => {
    if (!dateFrom || !dateTo) {
        alert("Both dates must be selected!");
        return;
    }
    // Save param in localStorage
    localStorage.setItem('date_from', dateFrom);
    localStorage.setItem('date_to', dateTo);

    // Updating the list after apply param
    fetchCheckIncomeListDates(dateFrom, dateTo); 
    fetchCheckExpenseListDates(dateFrom, dateTo);
    fetchCheckActorListDates(dateFrom, dateTo);
  }

  const resetParam = () => {
    setDateFrom("");
    setDateTo("");

    // Clear param from localStorage
    delete localStorage.date_from; 
    delete localStorage.date_to;

    // Updating the list after reset param
    fetchCheckIncomeList(); 
    fetchCheckExpenseList();
    fetchCheckActorList();
  }

  const openDetailsModal = async (name, id) => {
    await handleDetailsCheck(name, id);
    setFormError(""); // Clear previous form error on component mount
    handleToggleModal(name);
  };

  const handleDetailsCheck = async (name, id) => {
    if (name === "Details Check Income") {
      if (dateFrom && dateTo) {
        await fetchCheckIncomeDates(id, dateFrom, dateTo);
      } else {
        await fetchCheckIncome(id);
      }
      setSelectedRow(checkListByIncome);

    } else if (name === "Details Check Expense") {
      if (dateFrom && dateTo) {
        await fetchCheckExpenseDates(id, dateFrom, dateTo);
      } else {
        await fetchCheckExpense(id);
      }
      setSelectedRow(checkListByExpense);

    } else if (name === "Details Check Actor") {
      if (dateFrom && dateTo) {
        await fetchCheckActorDates(id, dateFrom, dateTo);
      } else {
        await fetchCheckActor(id);
      }
      setSelectedRow(checkListByActor);
    }
  }

  const { onDownload: onDownloadTableCheckIncome } = useDownloadExcel({
    currentTableRef: tableCheckIncomeRef.current,
    filename: "TableCheckIncome",
    sheet: "Sheet1"
  });

  const { onDownload: onDownloadTableCheckExpense } = useDownloadExcel({
    currentTableRef: tableCheckExpenseRef.current,
    filename: "TableCheckExpense",
    sheet: "Sheet1"
  });

  const { onDownload: onDownloadTableCheckActor } = useDownloadExcel({
    currentTableRef: tableCheckActorRef.current,
    filename: "TableCheckActor",
    sheet: "Sheet1"
  });

  return (
    <>
      <Container className="mt-2">
        {/* Block parameters */}
        <Row className="g-4">
          <Col xs={6} sm={4} md={2}>
            <Form.Label className="fw-bold">DATE FROM</Form.Label>
          </Col>
          <Col xs={6} sm={4} md={2}>
            <Form.Label className="fw-bold">DATE TO</Form.Label>
          </Col>
        </Row>
        <Row className="g-4">
          <Col xs={6} sm={4} md={2}>
            <Form.Control
              type="date"
              value={dateFrom || ""}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </Col>
          <Col xs={6} sm={4} md={2}>
            <Form.Control
              type="date"
              value={dateTo || ""}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Button className="button_style me-2" onClick={applyParam}>
              APPLY
            </Button>
            <Button variant="primary" onClick={resetParam}>
              RESET
            </Button>
          </Col>
        </Row>

        {/* Icon and button for Export to Excel */}
        <div className="d-flex justify-content-between">
          <p className="mt-3 bold-text text-danger">INCOME</p>
          <button className="export-btn" onClick={onDownloadTableCheckIncome}>
            <FaFileExcel className="me-2" />
            Export to Excel
          </button>
        </div>
        
        {/* Table Check Income */}
        <Table striped bordered ref={tableCheckIncomeRef}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Sum</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {checkIncomeList.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.description || ''}</td>
                <td>{row.sumVal}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => openDetailsModal("Details Check Income", row.id)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Icon and button for Export to Excel */}
        <div className="d-flex justify-content-between">
          <p className="mt-3 bold-text text-danger">EXPENSE</p>
          <button className="export-btn" onClick={onDownloadTableCheckExpense}>
            <FaFileExcel className="me-2" />
            Export to Excel
          </button>
        </div>
        
        {/* Table Check Expense */}
        <Table striped bordered ref={tableCheckExpenseRef}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Sum</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {checkExpenseList.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.description || ''}</td>
                <td>{row.category.name}</td>
                <td>{row.sumVal}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => openDetailsModal("Details Check Expense", row.id)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Icon and button for Export to Excel */}
        <div className="d-flex justify-content-between">
          <p className="mt-3 bold-text text-danger">ACTOR</p>
          <button className="export-btn" onClick={onDownloadTableCheckActor}>
            <FaFileExcel className="me-2" />
            Export to Excel
          </button>
        </div>
        
        {/* Table Check Actor */}
        <Table striped bordered ref={tableCheckActorRef}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Sum</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {checkActorList.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.description || ''}</td>
                <td>{row.sumVal}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => openDetailsModal("Details Check Actor", row.id)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal show={showModal} onHide={handleModalHide}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        {selectedRow && (
          <Modal.Body>
            {[ // Content wrapped in an array
              <Table striped bordered >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Value</th>
                    <th>Date</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRow.map((row, index) => (
                    <tr key={row.id}>
                      <td>{index + 1}</td>
                      <td className={row.val ? "" : "text-danger"}>
                        {row.val ? row.val : "Invalid Check"}
                      </td>
                      <td>{row.date}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ]}
          </Modal.Body>
        )}
        <Modal.Footer>
          {formError && <div className="text-danger text-end col-12">{formError}</div>}
          <Button variant="secondary" onClick={handleModalHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Reports;