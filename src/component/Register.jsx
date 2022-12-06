import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const POST_USER = gql`
  mutation signup($email: String!, $username: String!, $password: String!) {
    signup(user: { email: $email, username: $username, password: $password }) {
      email
      username
    }
  }
`;

const Register = () => {
  const [signUpForm, setSignUpForm] = useState({
    userName: "",
    lname: "",
    email: "",
    password: "",
  });
  const [signup] = useMutation(POST_USER, {
    onCompleted() {
      window.location.href = "/login";
    },
    onError(error) {
      alert(error.message);
    },
  });

  const userSignUp = (e) => {
    e.preventDefault();
    signup({
      variables: {
        email: signUpForm.email,
        username: signUpForm.userName,
        password: signUpForm.password,
      },
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
        <h1 className="text-center my-2">Register</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user name"
            onChange={(e) =>
              setSignUpForm({ ...signUpForm, userName: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) =>
              setSignUpForm({ ...signUpForm, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setSignUpForm({ ...signUpForm, password: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 text-center">
          <Button variant="info" onClick={(e) => userSignUp(e)}>
            Create Account
          </Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <label className="form-check-label" htmlFor="exampleCheck1">
            Already have an account? <a href="/login">Log in</a>
          </label>
        </Form.Group>
      </Form>
    </div>
    // <div
    //   className="h-100 d-flex justify-content-center align-items-center flex-column"
    //   style={{ backgroundColor: "#80808012" }}
    // >
    //   <Form
    //     className="card p-3 w-md-100 w-lg-75 w-50"
    //     style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    //   >
    //     <h1 className="text-center my-2">Register</h1>
    //     <div className="row">
    //       <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
    //         <Form.Label>First Name</Form.Label>
    //         <Form.Control
    //           type="text"
    //           placeholder="Enter first name"
    //           onChange={(e) =>
    //             setSignUpForm({ ...signUpForm, userName: e.target.value })
    //           }
    //         />
    //       </Form.Group>
    //       <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
    //         <Form.Label>Last Name</Form.Label>
    //         <Form.Control
    //           type="text"
    //           placeholder="Enter Last name"
    //           onChange={(e) =>
    //             setSignUpForm({ ...signUpForm, lName: e.target.value })
    //           }
    //         />
    //       </Form.Group>
    //     </div>

    //     <div className="row">
    //       <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
    //         <Form.Label>Email address</Form.Label>
    //         <Form.Control type="email" placeholder="Enter email" onChange={(e) =>
    //             setSignUpForm({ ...signUpForm, email: e.target.value })
    //           } />
    //       </Form.Group>

    //       <Form.Group className="mb-3 col-6" controlId="formBasicPassword">
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control type="password" placeholder="Password" onChange={(e) =>
    //             setSignUpForm({ ...signUpForm, password: e.target.value })
    //           }/>
    //       </Form.Group>
    //     </div>
    //     <Form.Group className="mb-3 text-center">
    //       <Button variant="info" onClick={(e)=>userSignUp(e)}>
    //         Create Account
    //       </Button>
    //     </Form.Group>
    //     <Form.Group className="mb-3" controlId="formBasicCheckbox">
    //       <label className="form-check-label" htmlFor="exampleCheck1">
    //         Already have an account? <a href="/login">Log in</a>
    //       </label>
    //     </Form.Group>
    //   </Form>
    // </div>
  );
};

export default Register;
