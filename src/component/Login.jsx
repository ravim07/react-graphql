import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(user: { email: $email, password: $password }) {
      jwt,
      id,
      username
    }
  }
`;

const Login = () => {
  const [logInForm, setLogInForm] = useState({
    email: "",
    password: "",
  });
  const [login, { data, loading, error }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      if (data?.login?.jwt) {
        localStorage.setItem("token", data.login.jwt);
        localStorage.setItem("userDetail", JSON.stringify(data.login) )
        window.location.href = "/dashboard";
      }
    },
    onError(error) {
      alert(error.message)
    },
  });

  const userLogIn = (e) => {
    e.preventDefault();
    login({
      variables: { email: logInForm.email, password: logInForm.password },
    });
  };
  return (
    <div
      className="h-100 d-flex justify-content-center align-items-center flex-column"
      style={{ backgroundColor: "#80808012" }}
    >
      <Form
        className="card p-4 w-md-100 w-lg-75"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", width: "35%" }}
      >
        <h1 className="text-center my-2">Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) =>
              setLogInForm({ ...logInForm, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setLogInForm({ ...logInForm, password: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 text-center">
          <Button variant="info" type="submit" onClick={(e) => userLogIn(e)}>
            &nbsp; Sign in&nbsp;
          </Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <label className="form-check-label" htmlFor="exampleCheck1">
            Don't have an account?
            <a href="/register">Create an account.</a>
          </label>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
