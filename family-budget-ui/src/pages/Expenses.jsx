import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Modal, Row, Col, Card } from "react-bootstrap";
import { useExpenseContext } from "../components/shared/ExpenseContext.jsx";
import { useCategoryContext } from "../components/shared/CategoryContext.jsx";
import { useFormErrorContext } from '../components/shared/FormErrorContext.jsx';

const Expenses = () => {
  
  const { formError, setFormError } = useFormErrorContext();
  const { expenseList, fetchExpenseList, 
    createExpense, updateExpense, deleteExpense } = useExpenseContext();
  const { categoryList, fetchCategoryList } = useCategoryContext();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseDescription, setNewExpenseDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [deleteExpenseId, setDeleteExpenseId] = useState("");

  const expenseId = useRef("");

  useEffect(() => {
    setFormError(""); // Clear previous form error on component mount
  }, []);

  useEffect(() => {
    if (expenseList.length === 0) {
      fetchExpenseList();
      fetchCategoryList();
    }
  }, [expenseList, fetchExpenseList]);

  useEffect(() => {
    if (!showModal) {
      handleModalHide();
    };
  }, [showModal]);

  useEffect(() => {
    if (!formError && showModal) {
      handleToggleModal("");
      fetchExpenseList(); // Updating the list after successful action
    }
    console.log("formError=", formError);
  }, [formError]);

  const handleToggleModal = (title, forceClose = false) => {
    setShowModal((prevShowModal) => forceClose ? false : !prevShowModal);
    setModalTitle(title);
  };

  const handleModalHide = () => {
    setNewExpenseName("");
    setNewExpenseDescription("");
    setSelectedCategoryId("");
    setDeleteExpenseId("");

    setFormError("");
    setShowModal(false);
  };

  const handleAddExpense = async () => {
    if (newExpenseName.trim() === "") {
      setFormError("Please fill in all the required fields.");
    } else {
      const payload = {
        name: newExpenseName,
        category: selectedCategoryId ? { id: selectedCategoryId } : null,
        description: newExpenseDescription
      };

      await createExpense(payload);
    }
  };

  const handleEditExpense = (id, name, description, category) => {
    setNewExpenseName(name);
    setNewExpenseDescription(description);
    if (category) {
      setSelectedCategoryId(category.id);
    } else {
      setSelectedCategoryId("");
    }
    expenseId.current = id;
    handleToggleModal("Edit Expense");
  };

  const handleUpdateExpense = async () => {
    if (newExpenseName.trim() === "") {
      setFormError("Please fill in all the required fields.");
    } else {
      const payload = {
        id: expenseId.current,
        name: newExpenseName,
        category: selectedCategoryId ? { id: selectedCategoryId } : null,
        description: newExpenseDescription
      };
  
      await updateExpense(payload);
    }
  };

  const handleDeleteExpense = async () => {
    await deleteExpense(deleteExpenseId);
  };

  return (
    <>
      <Container className="mt-2">
        <Button className="button_style_add" onClick={() => handleToggleModal("Add Expense")}>
          +Add Expense
        </Button>
        <Row xs={1} sm={2} md={3} className="g-4">
          {expenseList.map((item) => (
            <Col key={item.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Category: {item.category ? item.category.name : "N/A"}</Card.Text>
                  <Card.Text>Description: {item.description}</Card.Text>
                  <Card.Footer>
                    <Button
                      className="button_style"
                      style={{ backgroundColor: "forestgreen" }}
                      onClick={() => handleEditExpense(item.id, item.name, item.description, item.category)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="button_style ms-2"
                      style={{ backgroundColor: "firebrick" }}
                      onClick={() => {
                        setDeleteExpenseId(item.id);
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
        {modalTitle === "Add Expense" && (
          <Modal.Body>
            {[ // Content wrapped in an array
              <Form key="add-expense-form">
                <Form.Group controlId="formExpenseName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newExpenseName || ""}
                    onChange={(e) => setNewExpenseName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formExpenseCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                  >
                    <option value="">-- Select a Category --</option>
                    {categoryList.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formExpenseDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newExpenseDescription || ''}
                    onChange={(e) => setNewExpenseDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>
            ]}
          </Modal.Body>
        )}
        {modalTitle === "Edit Expense" && (
          <Modal.Body>
            {[ // Content wrapped in an array
              <Form key="edit-expense-form">
                <Form.Group controlId="formExpenseName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newExpenseName || ""}
                    onChange={(e) => setNewExpenseName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formExpenseCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                  >
                    <option value="">-- Select a Category --</option>
                    {categoryList.map((category) => {
                      if (category.id !== selectedCategoryId) {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        )
                      } else {
                        return (
                          <option key={category.id} value={category.id} defaultChecked>
                            {category.name}
                          </option>
                        )
                      }
                    })}
                  </Form.Select>
                </Form.Group>                
                <Form.Group controlId="formExpenseDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newExpenseDescription || ''}
                    onChange={(e) => setNewExpenseDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>
            ]}
          </Modal.Body>
        )}
        {modalTitle === "Confirm Delete" && (
          <Modal.Body>Are you sure you want to delete this Expense?</Modal.Body>
        )}
        <Modal.Footer>
          {formError && <div className="text-danger text-end col-12">{formError}</div>}
          <Button variant="secondary" onClick={handleModalHide}>
            Cancel
          </Button>
          {modalTitle === "Add Expense" && (
            <Button variant="primary" onClick={handleAddExpense}>
              Add
            </Button>
          )}
          {modalTitle === "Edit Expense" && (
            <Button variant="primary" onClick={handleUpdateExpense}>
              Update
            </Button>
          )}
          {modalTitle === "Confirm Delete" && (
            <Button variant="danger" onClick={handleDeleteExpense}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Expenses;