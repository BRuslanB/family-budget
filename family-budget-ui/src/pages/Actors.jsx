import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Modal, Row, Col, Card } from "react-bootstrap";
import { useActorContext } from "../components/shared/ActorContext.jsx";
import { useFormErrorContext } from '../components/shared/FormErrorContext.jsx';

const Actors = () => {

  const { formError, setFormError } = useFormErrorContext();
  const { actorList, fetchActorList, 
    createActor, updateActor, deleteActor } = useActorContext();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [newActorName, setNewActorName] = useState("");
  const [newActorDescription, setNewActorDescription] = useState("");
  const [deleteActorId, setDeleteActorId] = useState("");

  const actorId = useRef("");

  useEffect(() => {
    setFormError(""); // Clear previous form error on component mount
  }, []);

  useEffect(() => {
    if (actorList.length === 0) {
      fetchActorList();
    }
  }, [actorList, fetchActorList]);

  useEffect(() => {
    if (!showModal) {
      handleModalHide();
    };
  }, [showModal]);

  useEffect(() => {
    if (!formError && showModal) {
      handleToggleModal("");
      fetchActorList(); // Updating the list after successful action
    }
    console.log("formError=", formError);
  }, [formError]);

  const handleToggleModal = (title, forceClose = false) => {
    setShowModal((prevShowModal) => forceClose ? false : !prevShowModal);
    setModalTitle(title);
  };

  const handleModalHide = () => {
    setNewActorName("");
    setNewActorDescription("");
    setDeleteActorId("");

    setFormError("");
    setShowModal(false);
  };

  const handleAddActor = async () => {
    if (newActorName.trim() === "") {
      setFormError("Please fill in all the required fields.");
    } else {
      const payload = {
        name: newActorName,
        description: newActorDescription
      };

      await createActor(payload);
    }
  };

  const handleEditActor = (id, name, description) => {
    setNewActorName(name);
    setNewActorDescription(description);
    actorId.current = id;
    handleToggleModal("Edit Actor");
  };

  const handleUpdateActor = async () => {
  if (newActorName.trim() === "") {
      setFormError("Please fill in all the required fields.");
    } else {
      const payload = {
        id: actorId.current,
        name: newActorName,
        description: newActorDescription
      };

      await updateActor(payload);
    }
  };

  const handleDeleteActor = async () => {
    await deleteActor(deleteActorId);
  };

  return (
    <>
      <Container className="mt-2">
        <Button className="button_style_add" onClick={() => handleToggleModal("Add Actor")}>
          +Add Actor
        </Button>
        <Row xs={1} md={2} className="g-4">
          {actorList.map((item) => (
            <Col key={item.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Description: {item.description}</Card.Text>
                  <Card.Footer>
                    <Button
                      className="button_style"
                      style={{ backgroundColor: "forestgreen" }}
                      onClick={() => handleEditActor(item.id, item.name, item.description)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="button_style ms-2"
                      style={{ backgroundColor: "firebrick" }}
                      onClick={() => {
                        setDeleteActorId(item.id);
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
        {modalTitle === "Add Actor" && (
          <Modal.Body>
            {[ // Content wrapped in an array
              <Form key="add-actor-form">
                <Form.Group controlId="formActorName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newActorName || ""}
                    onChange={(e) => setNewActorName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formActorDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newActorDescription || ''}
                    onChange={(e) => setNewActorDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>
            ]}
          </Modal.Body>
        )}
        {modalTitle === "Edit Actor" && (
          <Modal.Body>
            {[ // Content wrapped in an array
              <Form key="edit-actor-form">
                <Form.Group controlId="formActorName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newActorName || ""}
                    onChange={(e) => setNewActorName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formActorDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newActorDescription || ''}
                    onChange={(e) => setNewActorDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>
            ]}
          </Modal.Body>
        )}
        {modalTitle === "Confirm Delete" && (
          <Modal.Body>Are you sure you want to delete this Actor?</Modal.Body>
        )}
        <Modal.Footer>
          {formError && <div className="text-danger text-end col-12">{formError}</div>}
          <Button variant="secondary" onClick={handleModalHide}>
            Cancel
          </Button>
          {modalTitle === "Add Actor" && (
            <Button variant="primary" onClick={handleAddActor}>
              Add
            </Button>
          )}
          {modalTitle === "Edit Actor" && (
            <Button variant="primary" onClick={handleUpdateActor}>
              Update
            </Button>
          )}
          {modalTitle === "Confirm Delete" && (
            <Button variant="danger" onClick={handleDeleteActor}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Actors;