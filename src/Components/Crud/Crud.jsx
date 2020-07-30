import React, { useState, useEffect } from "react";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

function Crud(props) {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editId, setEditId] = useState(false);
  const [age, setAge] = useState("");
  const toggle = () => setModal(!modal);

  const inputChangeHandler = (event, setter) => {
    setter(event.target.value);
  };

  const addContactHandler = (e) => {
    e.preventDefault();
    toggle();
    if (editId) {
      submitEditHanlder();
      return;
    }
    const newUsers = [...users];
    newUsers.push({ id: Date.now(), firstName, lastName, age });
    setFirstName("");
    setLastName("");
    setAge("");
    setUsers(newUsers);
  };

  const deleteUserHandler = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
  };

  const editUserHandler = (id) => {
    setEditId(id);
    const user = users.find((user) => user.id == id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAge(user.age);
    toggle();
  };

  const submitEditHanlder = () => {
    const newUsers = [...users];
    const theIndex = newUsers.findIndex((user) => user.id == editId);
    newUsers[theIndex] = { id: editId, firstName, lastName, age };
    setUsers(newUsers);
    setEditId(null);
    setFirstName("");
    setLastName("");
    setAge("");
  };

  return (
    <div style={{ width: "1000px", margin: " 3rem auto" }}>
      <header>
        <Button color="danger" onClick={toggle}>
          New
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add New</ModalHeader>
          <ModalBody>
            {/*  */}
            <InputGroup className="my-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>FN</InputGroupText>
              </InputGroupAddon>
              <Input value={firstName} onChange={(e) => inputChangeHandler(e, setFirstName)} placeholder="first name" />
            </InputGroup>
            {/*  */}
            <InputGroup className="my-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>LN</InputGroupText>
              </InputGroupAddon>
              <Input value={lastName} onChange={(e) => inputChangeHandler(e, setLastName)} placeholder="last name" />
            </InputGroup>
            {/*  */}
            <InputGroup className="my-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>A</InputGroupText>
              </InputGroupAddon>
              <Input value={age} onChange={(e) => inputChangeHandler(e, setAge)} placeholder="age" />
            </InputGroup>
            {/*  */}
          </ModalBody>
          <ModalFooter>
            <Button onClick={addContactHandler} color="primary">
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </header>
      <Table dark>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td>
                <Button onClick={() => deleteUserHandler(user.id)} color={"danger"}>
                  D
                </Button>
                <Button onClick={() => editUserHandler(user.id)} color={"primary"}>
                  E
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Crud;
