// import React, { useState, useEffect } from "react";
// import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";

// function Crudcentre() {
//   const [members, setMembers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [paginatedMembers, setPaginatedMembers] = useState([]);
//   const membersPerPage = 10;

//   useEffect(() => {
//     loadInitialData();
//   }, []);
  

//   useEffect(() => {
//     paginateMembers();
//   }, [members, currentPage]);

//   const loadInitialData = async () => {
//     try {
//       const response = await fetch("/Centre.json");
//       if (!response.ok) {
//         throw new Error("Failed to load JSON data");
//       }
//       const data = await response.json();
//       setMembers(data);
//     } catch (error) {
//       console.error("Error loading initial data:", error);
//     }
//   };

//   const paginateMembers = () => {
//     const startIndex = (currentPage - 1) * membersPerPage;
//     const endIndex = startIndex + membersPerPage;
//     setPaginatedMembers(members.slice(startIndex, endIndex));
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     const totalPages = Math.ceil(members.length / membersPerPage);
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleUpdateMember = async (updatedMember) => {
//     try {
//       const response = await fetch(`http://localhost:8081/api/moderator/${updatedMember.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedMember),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update member");
//       }

//       setMembers(members.map((member) => (member.id === updatedMember.id ? updatedMember : member)));
//     } catch (error) {
//       console.error("Error updating member:", error);
//     }
//   };

//   const handleDeleteMember = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:8081/api/moderator/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete member");
//       }

//       setMembers(members.filter((member) => member.id !== id));
//     } catch (error) {
//       console.error("Error deleting member:", error);
//     }
//   };

//   return (
//     <Container fluid>
//       <Row>
//         <Col md="12">
//           <Card className="strpied-tabled-with-hover">
//             <Card.Header>
//               <Card.Title as="h4">Data des centres</Card.Title>
//               <Button className="btn btn-primary" onClick={() => handleAddMember()}>
//                 Add New Member
//               </Button>
//             </Card.Header>
//             <Card.Body className="table-full-width table-responsive px-0">
//               <Table className="table-hover table-striped">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Phone Number</th>
//                     <th>Address</th>
//                     <th>City</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginatedMembers.map((member) => (
//                     <tr key={member.id}>
//                       <td>{member.id}</td>
//                       <td>{member.name}</td>
//                       <td>{member.phoneNumber}</td>
//                       <td>{member.address}</td>
//                       <td>{member.city}</td>
//                       <td>
//                         <Button className="btn btn-warning" onClick={() => handleUpdateMember(member)}>
//                           Update
//                         </Button>
//                         <Button className="btn btn-danger" onClick={() => handleDeleteMember(member.id)}>
//                           Delete
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//               <div className="pagination">
//                 <Button onClick={handlePrevPage} disabled={currentPage === 1}>
//                   Previous
//                 </Button>
//                 <span>Page {currentPage}</span>
//                 <Button onClick={handleNextPage} disabled={currentPage >= Math.ceil(members.length / membersPerPage)}>
//                   Next
//                 </Button>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Crudcentre;

import React, { useState, useEffect } from "react";
import { Button, Card, Table, Container, Row, Col, Modal, Form } from "react-bootstrap";

function Crudcentre() {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedMembers, setPaginatedMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCenter, setNewCenter] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    city: ""
  });
  const membersPerPage = 10;

  useEffect(() => {
    loadInitialData();
  }, []);
  

  useEffect(() => {
    paginateMembers();
  }, [members, currentPage]);

  const loadInitialData = async () => {
    try {
      const response = await fetch("/Centre.json");
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

  const handleAddCenter = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/center", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCenter),
      });

      if (!response.ok) {
        throw new Error("Failed to add center");
      }

      const addedCenter = await response.json();
      setMembers([...members, addedCenter]);
      setShowModal(false); // Close the modal after adding
      setNewCenter({ name: "", phoneNumber: "", address: "", city: "" }); // Reset the form
    } catch (error) {
      console.error("Error adding center:", error);
    }
  };

  const handleUpdateMember = async (updatedMember) => {
    try {
      const response = await fetch(`http://localhost:8081/api/center/${updatedMember.id}`, {
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
      const response = await fetch(`http://localhost:8081/api/center/${id}`, {
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
              <Card.Title as="h4">Data des centres</Card.Title>
              <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Ajouter un nouveau centre
              </Button>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Numéro de téléphone</th>
                    <th>Adresse</th>
                    <th>Ville</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMembers.map((member) => (
                    <tr key={member.id}>
                      <td>{member.id}</td>
                      <td>{member.name}</td>
                      <td>{member.phoneNumber}</td>
                      <td>{member.address}</td>
                      <td>{member.city}</td>
                      <td>
                        <Button className="btn btn-warning" onClick={() => handleUpdateMember(member)}>
                          Modifier
                        </Button>
                        <Button className="btn btn-danger" onClick={() => handleDeleteMember(member.id)}>
                          Supprimer
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="pagination">
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Précédent
                </Button>
                <span>Page {currentPage}</span>
                <Button onClick={handleNextPage} disabled={currentPage >= Math.ceil(members.length / membersPerPage)}>
                  Suivant
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Adding New Center */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouveau centre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le nom du centre"
                value={newCenter.name}
                onChange={(e) => setNewCenter({ ...newCenter, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Numéro de téléphone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le numéro de téléphone"
                value={newCenter.phoneNumber}
                onChange={(e) => setNewCenter({ ...newCenter, phoneNumber: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez l'adresse"
                value={newCenter.address}
                onChange={(e) => setNewCenter({ ...newCenter, address: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ville</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez la ville"
                value={newCenter.city}
                onChange={(e) => setNewCenter({ ...newCenter, city: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddCenter}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Crudcentre;
