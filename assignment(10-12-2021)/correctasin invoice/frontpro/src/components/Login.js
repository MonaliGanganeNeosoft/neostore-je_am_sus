import React, { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../config/MyService";

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const login = (event) => {
        event.preventDefault();
        userLogin(data).then((res) => {
            if (res.data.flag === 1) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                alert(res.data.message);
                navigate("/dashboard");
            } else if (res.data.flag === 0) {
                alert(res.data.message);
            } else if (res.data.err === 0) {
                alert(res.data.message);
            }
        });
    };

    return (
        <div
            style={{
               
                height: "100vh",
                width: "100vw",
            }}
        >
            <Container>
                <br />
                <Card
                    style={{
                        margin: "auto",
                        marginTop: "9rem",
                        width: "30rem",
                        backgroundColor: "pink",
                    }}
                >
                    <h2 className="text-center">Login Here</h2>
                    <Form
                        style={{
                            width: "400px",
                            margin: "auto",
                        }}
                        onSubmit={(e) => login(e)}
                    >
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                // placeholder="Enter email"
                                onChange={handler}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                // placeholder="Password"
                                onChange={handler}
                            />
                        </Form.Group>
                        <br />
                        <div className="text-center">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <br></br>
                            <Button
                                variant="pink"
                                type="button"
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Don't have an account? Click Here
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    );
}
