import axios from "axios";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import UpdateUserForm from "./UpdateUserForm";
import { BASE_URL } from "./Helper";

const DisplayUser = () => {
  const [displayUser, setDisplayUser] = useState([]);

  const [updateUserId, setUpdateUserId] = useState(null);
  //user updated

  useEffect(() => {
    const dataFetch = async () => {
      const response = await axios.get(`${BASE_URL}/user/get`);
      setDisplayUser(response.data.users);
      console.log(response.data.users);
    };
    dataFetch();
  });
  //

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/user/delete/${id}`);
      setDisplayUser((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    setUpdateUserId(id);
  };

  const updateUser = (id, updatedData) => {
    setDisplayUser((prevUsers) =>
      prevUsers.map((user) => {
        if (user._id === id) {
          return { ...user, ...updatedData };
        }
        return user;
      })
    );
    setUpdateUserId(null);
  };
  return (
    <>
      <h1>Users</h1>
      {displayUser.map((user) => (
        <Container key={user._id} className="usersMap">
          <h1>FirstName: {user.firstName}</h1>
          <h1>LastName: {user.lastName}</h1>
          <h4>Email: {user.email}</h4>
          <h4>Mobile No: {user.mobile}</h4>
          <p>Address1: {user.address1}</p>
          <p>Address2: {user.address2}</p>
          <p>State: {user.state}</p>
          <p>Country: {user.country}</p>
          <p>zipCode: {user.zipCode}</p>
          <Button variant="primary" onClick={() => handleDelete(user._id)}>
            Delete
          </Button>
          {updateUserId === user._id ? (
            <UpdateUserForm user={user} updateUser={updateUser} />
          ) : (
            <Button variant="primary" onClick={() => handleUpdate(user._id)}>
              Update
            </Button>
          )}
        </Container>
      ))}
    </>
  );
};

export default DisplayUser;
