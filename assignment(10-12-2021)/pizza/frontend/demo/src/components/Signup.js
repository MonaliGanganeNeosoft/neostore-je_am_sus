import React, { useState } from "react";
import axios from "axios";
import { addSignup } from "../config/Myservice";
import bcrypt from "bcryptjs";
import {
  Button,
  Row,
  Col,
  Form,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// import bcryptjs from 'bcryptjs';
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = /^[a-zA-Z ]{2,100}$/;
const regForUsername = RegExp(
  /^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/
);
const regForPassword = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);
const regForMobile = RegExp(
  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
);
function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    repeatpassword: "",
  });
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    repeatpassword: "",
  });
  const handler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fname":
        let efname = regForName.test(value) ? "" : "Please Enter Valid Name";
        setErrors({ ...errors, fname: efname });
        console.log(value);
        break;
      case "lname":
        let elname = regForName.test(value) ? "" : "Please Enter Valid Name";
        setErrors({ ...errors, lname: elname });
        break;
      case "email":
        let eemail = regForEmail.test(value) ? "" : "Enter Valid Email";
        setErrors({ ...errors, email: eemail });
        break;
      case "mobile":
        let emobile = regForMobile.test(value) ? "" : "Enter Valid Mobile No";
        setErrors({ ...errors, mobile: emobile });
        console.log(emobile);
        break;

      case "password":
        let epassword = regForPassword.test(value)
          ? ""
          : "Enter Valid Password";
        setErrors({ ...errors, password: epassword });
        break;
      case "repeatpassword":
        console.log(user.password);
        console.log(value);
        let erepeatpassword =
          value !== user.password ? "Password Dont Match" : "";
        setErrors({ ...errors, repeatpassword: erepeatpassword });
        break;

      default:
    }
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formSubmit = async (event) => {
    event.preventDefault();

    if (
      validate(errors) &&
      document.getElementById("fname").value !== "" &&
      document.getElementById("lname").value !== "" &&
      document.getElementById("email").value !== "" &&
      document.getElementById("mobile").value !== "" &&
      document.getElementById("password").value !== "" &&
      document.getElementById("repeatpassword").value !== ""
    ) {
      let formData = {
        fname: user.fname,
        lname: user.lname,
        mobile: user.mobile,
        email: user.email,
        password: user.password,
      };
      addSignup(formData).then((res) => {
        console.log(res.data);
      });

      alert("Registered Succesfully");
      document.getElementById("myForm").reset();
      navigate("/login");
    } else {
      alert("Please Enter Valid Data");
    }
  };
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  if (localStorage.getItem("login")) {
    return <h1>You Are Logged In</h1>;
  } else {
    return (
      <div>
        <Container className=" mt-3">
          <h1>Pls register to Signup</h1>
          <Form id="myForm" style={{ backgroundColor: "pink", width: "700px" }}>
            <Form.Group>
              <Row className="justify-content-md-center">
                <Col xs lg="3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    placeholder="First name"
                    name="fname"
                    id="fname"
                    onChange={handler}
                  />

                  {errors.fname && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.fname}
                    </Form.Text>
                  )}
                </Col>
                <Col xs lg="3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    placeholder="Last name"
                    name="lname"
                    id="lname"
                    onChange={handler}
                  />
                  {errors.lname && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.lname}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row className="justify-content-md-center">
                <Col xs lg="6">
                  <Form.Label>Enter Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    id="email"
                    onChange={handler}
                  />
                  {errors.email && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.email}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row className="justify-content-md-center">
                <Col xs lg="6">
                  <Form.Label>Enter Mobile No</Form.Label>
                  <InputGroup className="mb-2">
                    {/* <InputGroup.Text>@</InputGroup.Text> */}

                    <FormControl
                      type="Number"
                      placeholder="Mobile No"
                      name="mobile"
                      id="mobile"
                      onChange={handler}
                    />
                  </InputGroup>
                  {errors.mobile && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.mobile}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row className="justify-content-md-center">
                <Col xs lg="3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    id="password"
                    onChange={handler}
                  />
                  {errors.password && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.password}
                    </Form.Text>
                  )}
                </Col>
                <Col xs lg="3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="repeatpassword"
                    id="repeatpassword"
                    onChange={handler}
                  />
                  {errors.repeatpassword && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.repeatpassword}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <br />
            <Form.Group>
              <Button variant="primary" type="submit" onClick={formSubmit}>
                signup
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Signup;
