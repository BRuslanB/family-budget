import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Modal, Row, Col, Card } from "react-bootstrap";
import { useIncomeContext } from "../components/shared/IncomeContext.jsx";
import { useFormErrorContext } from '../components/shared/FormErrorContext.jsx';

const Incomes = () => {
  const { formError, setFormError } = useFormErrorContext();
  const { incomeList, fetchIncomeList, 
    createIncome, updateIncome, deleteIncome } = useIncomeContext();
  
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [newIncomeName, setNewIncomeName] = useState("");
  const [newIncomeDescription, setNewIncomeDescription] = useState("");
  const [deleteIncomeId, setDeleteIncomeId] = useState("");

  const incomeId = useRef("");

  useEffect(() => {
    setFormError(""); // Clear previous form error on component mount
  }, []);

  useEffect(() => {
    if (incomeList.length === 0) {
      fetchIncomeList();
    }
  }, [incomeList, fetchIncomeList]);

  useEffect(() => {
    if (!showModal) {
      handleModalHide();
    };
  }, [showModal]);

  useEffect(() => {
    if (!formError && showModal) {
      handleToggleModal("");
      fetchIncomeList(); // Updating the list after successful action
    }
    console.log("formError=", formError);
  }, [formError]);

  const handleToggleModal = (title, forceClose = false) => {
    setShowModal((prevShowModal) => forceClose ? false : !prevShowModal);
    setModalTitle(title);
  };

  const handleModalHide = () => {
    setNewIncomeName("");
    setNewIncomeDescription("");
    setDeleteIncomeId("");

    setFormError("");
    setShowModal(false);
  };
  
  const handleAddIncome = async () => {
    if (newIncomeName.trim() === "") {
      setFormError("Please fill in all the required fields.");
    } else {
      const payload = {
        name: newIncomeName,
        description: newIncomeDescription
      };

      await createIncome(payload);
    }
  };

  const handleEditIncome = (id, name, description) => {
    setNewIncomeName(name);
    setNewIncomeDescription(description);
    incomeId.current = id;
    handleToggleModal("Edit Income");
  };

  const handleUpdateIncome = async () => {
    if (newIncomeName.trim() === "") {
      setFormError("Please fill in all the required fields.");
    } else {
      const payload = {
        id: incomeId.current,
        name: newIncomeName,
        description: newIncomeDescription
      };

      await updateIncome(payload);
    }
  };

  const handleDeleteIncome = async () => {
    await deleteIncome(deleteIncomeId);
  };

  return (
    <>
      <Container className="mt-2">
        <Button className="button_style_add" onClick={() => handleToggleModal("Add Income")}>
          +Add Income
        </Button>
        <Row xs={1} sm={2} md={3} className="g-4">
          {incomeList.map((item) => (
            <Col key={item.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Description: {item.description}</Card.Text>
                  <Card.Footer>
                    <Button
                      className="button_style"
                      style={{ backgroundColor: "forestgreen" }}
                      onClick={() => handleEditIncome(item.id, item.name, item.description)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="button_style ms-2"
                      style={{ backgroundColor: "firebrick" }}
                      onClick={() => {
                        setDeleteIncomeId(item.id);
                        handleToggleModal("Confirm Delete");
                      }}
                    >
                      Delete
                    </Button>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleModalHide}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        {modalTitle === "Add Income" && (
          <Modal.Body>
            {[ // Content wrapped in an array
              <Form key="add-income-form">
                <Form.Group controlId="formIncomeName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newIncomeName || ""}
                    onChange={(e) => setNewIncomeName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formIncomeDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newIncomeDescription || ''}
                    onChange={(e) => setNewIncomeDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>
            ]}
          </Modal.Body>
        )}
        {modalTitle === "Edit Income" && (
          <Modal.Body>
            {[ // Content wrapped in an array
              <Form key="edit-income-form">
                <Form.Group controlId="formIncomeName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newIncomeName || ""}
                    onChange={(e) => setNewIncomeName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formIncomeDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newIncomeDescription || ''}
                    onChange={(e) => setNewIncomeDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>
            ]}
          </Modal.Body>
        )}
        {modalTitle === "Confirm Delete" && (
          <Modal.Body>Are you sure you want to delete this Income?</Modal.Body>
        )}
        <Modal.Footer>
          {formError && <div className="text-danger text-end col-12">{formError}</div>}
          <Button variant="secondary" onClick={handleModalHide}>
            Cancel
          </Button>
          {modalTitle === "Add Income" && (
            <Button variant="primary" onClick={handleAddIncome}>
              Add
            </Button>
          )}
          {modalTitle === "Edit Income" && (
            <Button variant="primary" onClick={handleUpdateIncome}>
              Update
            </Button>
          )}
          {modalTitle === "Confirm Delete" && (
            <Button variant="danger" onClick={handleDeleteIncome}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Incomes;