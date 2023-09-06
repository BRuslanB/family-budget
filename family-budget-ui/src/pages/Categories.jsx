import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Modal, Row, Col, Card } from "react-bootstrap";
import { useCategoryContext } from "../components/shared/CategoryContext.jsx";
import { useFormErrorContext } from '../components/shared/FormErrorContext.jsx';

const Categories = () => {

  const { formError, setFormError } = useFormErrorContext();
  const { categoryList, fetchCategoryList, 
    createCategory, updateCategory, deleteCategory } = useCategoryContext();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [deleteCategoryId, setDeleteCategoryId] = useState("");

  const categoryId = useRef("");

  useEffect(() => {
    setFormError(""); // Clear previous form error on component mount
  }, []);

  useEffect(() => {
    if (categoryList.length === 0) {
      fetchCategoryList();
    }
  }, [categoryList, fetchCategoryList]);

  useEffect(() => {
    if (!showModal) {
      handleModalHide();
    };
  }, [showModal]);

  useEffect(() => {
    if (!formError && showModal) {
      handleToggleModal("");
      fetchCategoryList(); // Updating the list after successful action
    }
    console.log("formError=", formError);
  }, [formError]);

  const handleToggleModal = (title, forceClose = false) => {
    setShowModal((prevShowModal) => forceClose ? false : !prevShowModal);
    setModalTitle(title);
  };

  const handleModalHide = () => {
    setNewCategoryName("");
    setNewCategoryDescription("");
    setDeleteCategoryId("");

    setFormError("");
    setShowModal(false);
  };

  const handleAddCategory = async () => {
    if (newCategoryName.trim() === "") {
      setFormError("Please fill in all the required fields.");
    } else {
      const payload = {
        name: newCategoryName,
        description: newCategoryDescription
      };

      await createCategory(payload);
    }
  };

  const handleEditCategory = (id, name, description) => {
    setNewCategoryName(name);
    setNewCategoryDescription(description);
    categoryId.current = id;
    handleToggleModal("Edit Category");
  };

  const handleUpdateCategory = async () => {
    if (newCategoryName.trim() === "") {
      setFormError("Please fill in all the required fields.");
    } else {
      const payload = {
        id: categoryId.current,
        name: newCategoryName,
        description: newCategoryDescription
      };

      await updateCategory(payload);
    }
  };

  const handleDeleteCategory = async () => {
    await deleteCategory(deleteCategoryId);
  };

  return (
    <>
      <Container className="mt-2">
        <Button className="button_style_add" onClick={() => handleToggleModal("Add Category")}>
          +Add Category
        </Button>
        <Row xs={1} sm={2} md={3} className="g-4">
          {categoryList.map((item) => (
            <Col key={item.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Description: {item.description}</Card.Text>
                  <Card.Footer>
                    <Button
                      className="button_style"
                      style={{ backgroundColor: "forestgreen" }}
                      onClick={() => handleEditCategory(item.id, item.name, item.description)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="button_style ms-2"
                      style={{ backgroundColor: "firebrick" }}
                      onClick={() => {
                        setDeleteCategoryId(item.id);
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
        {modalTitle === "Add Category" && (
          <Modal.Body>
            {[ // Content wrapped in an array
              <Form key="add-category-form">
                <Form.Group controlId="formCategoryName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newCategoryName || ""}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formCategoryDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newCategoryDescription || ''}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>
            ]}
          </Modal.Body>
        )}
        {modalTitle === "Edit Category" && (
          <Modal.Body>
            {[ // Content wrapped in an array
              <Form key="edit-category-form">
                <Form.Group controlId="formCategoryName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newCategoryName || ""}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formCategoryDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newCategoryDescription || ''}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>
            ]}
          </Modal.Body>
        )}
        {modalTitle === "Confirm Delete" && (
          <Modal.Body>Are you sure you want to delete this Category?</Modal.Body>
        )}
        <Modal.Footer>
          {formError && <div className="text-danger text-end col-12">{formError}</div>}
          <Button variant="secondary" onClick={handleModalHide}>
            Cancel
          </Button>
          {modalTitle === "Add Category" && (
            <Button variant="primary" onClick={handleAddCategory}>
              Add
            </Button>
          )}
          {modalTitle === "Edit Category" && (
            <Button variant="primary" onClick={handleUpdateCategory}>
              Update
            </Button>
          )}
          {modalTitle === "Confirm Delete" && (
            <Button variant="danger" onClick={handleDeleteCategory}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Categories;