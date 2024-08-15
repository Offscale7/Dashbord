import React, { useState, useEffect } from "react";
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";

function Crudmode() {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedMembers, setPaginatedMembers] = useState([]);
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

  const handleAddMember = async (newMember) => {
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
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleUpdateMember = async (updatedMember) => {
    try {
      const response = await fetch(`http://localhost:8081/api/moderator/${updatedMember.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMember),
      });

      if (!response.ok) {
        throw new Error("Failed to update member");
      }

      setMembers(members.map((member) => (member.id === updatedMember.id ? updatedMember : member)));
    } catch (error) {
      console.error("Error updating member:", error);
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
              <Card.Title as="h4">Data des modérateurs</Card.Title>
              <Button className="btn btn-primary" onClick={() => handleAddMember(/* pass the new member data here */)}>
                Add New Member
              </Button>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>CIN Number</th>
                    <th>City</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMembers.map((member) => (
                    <tr key={member.id}>
                      <td>{member.id}</td>
                      <td>{member.name}</td>
                      <td>{member.phoneNumber}</td>
                      <td>{member.idCardNumber}</td>
                      <td>{member.city}</td>
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
    </Container>
  );
}

export default Crudmode;
