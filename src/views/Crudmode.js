import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Table, Container, Row, Col, Modal, Form } from "react-bootstrap";

function Crudmode() {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedMembers, setPaginatedMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMember, setNewMember] = useState({
    username: "",
    email: "",
    password: "",
    dateNaissance: "",
    codePostal: "",
    phoneNumber: ""
  });
  const [editingMember, setEditingMember] = useState(null);

  const membersPerPage = 10;

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    paginateMembers();
  }, [members, currentPage]);

  const loadInitialData = async () => {
    try {
      const response = await fetch("/Moderateur.json");
      if (!response.ok) {
        throw new Error("Failed to load JSON data");
      }
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  const paginateMembers = () => {
    const startIndex = (currentPage - 1) * membersPerPage;
    const endIndex = startIndex + membersPerPage;
    setPaginatedMembers(members.slice(startIndex, endIndex));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(members.length / membersPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    setEditingMember(null);
    setNewMember({
      username: "",
      email: "",
      password: "",
      dateNaissance: "",
      codePostal: "",
      phoneNumber: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleAddMember = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/moderator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });

      if (!response.ok) {
        throw new Error("Failed to add member");
      }

      const addedMember = await response.json();
      setMembers([...members, addedMember]);
      handleModalClose();
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleUpdateMember = (member) => {
    setEditingMember(member);
    setNewMember(member);
    setShowModal(true);
  };

  const handleSaveMember = async () => {
    if (editingMember) {
      try {
        const response = await fetch(`http://localhost:8081/api/moderator/${editingMember.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMember),
        });

        if (!response.ok) {
          throw new Error("Failed to update member");
        }

        setMembers(
          members.map((member) =>
            member.id === editingMember.id ? newMember : member
          )
        );
        handleModalClose();
      } catch (error) {
        console.error("Error updating member:", error);
      }
    } else {
      handleAddMember();
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/moderator/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete member");
      }

      setMembers(members.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Gestion des modérateurs</Card.Title>
              <Button className="btn btn-primary" onClick={handleModalShow}>
                Add New Member
              </Button>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>username</th>
                    <th>email</th>
                    <th>password</th>
                    <th>dateNaissance</th>
                    <th>codePostal</th>
                    <th>phoneNumber</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMembers.map((member) => (
                    <tr key={member.id}>
                      <td>{member.id}</td>
                      <td>{member.username}</td>
                      <td>{member.email}</td>
                      <td>{member.password}</td>
                      <td>{member.dateNaissance}</td>
                      <td>{member.codePostal}</td>
                      <td>{member.phoneNumber}</td>
                      <td>
                        <Button className="btn btn-warning" onClick={() => handleUpdateMember(member)}>
                          Update
                        </Button>
                        <Button className="btn btn-danger" onClick={() => handleDeleteMember(member.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="pagination">
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Previous
                </Button>
                <span>Page {currentPage}</span>
                <Button onClick={handleNextPage} disabled={currentPage >= Math.ceil(members.length / membersPerPage)}>
                  Next
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Add/Update Member */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingMember ? "Update Member" : "Add New Member"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={newMember.username}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newMember.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newMember.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formDateNaissance">
              <Form.Label>Date de Naissance</Form.Label>
              <Form.Control
                type="date"
                name="dateNaissance"
                value={newMember.dateNaissance}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formCodePostal">
              <Form.Label>Code Postal</Form.Label>
              <Form.Control
                type="text"
                name="codePostal"
                value={newMember.codePostal}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={newMember.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveMember}>
            {editingMember ? "Update Member" : "Add Member"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Crudmode;
