import React, { useState, useEffect } from "react";
import Nav1 from "./Nav1";
import { Container, Col, Card, Row, Button } from "react-bootstrap";
import { getInvoice } from "../config/MyService";
import { useNavigate } from "react-router";

export default function Dashboard() {
    const navigate = useNavigate();
    let [total, setTotal] = useState(0);
    let [paid, setPaid] = useState(0);
    let [unpaid, setUnpaid] = useState(0);
    let [partpaid, setPartpaid] = useState(0);
    useEffect(() => {
        getInvoice().then((res) => {
            res.data.forEach((element) => {
                if (element.status === "Unpaid") {
                    unpaid += 1;
                    setUnpaid(unpaid);
                } else if (element.status === "Paid") {
                    paid += 1;
                    setPaid(paid);
                } else if (element.status === "Partially Paid") {
                    partpaid += 1;
                    setPartpaid(partpaid);
                }
                total += 1;
                setTotal(total);
            });
        });
    }, []);

    return (
        <div>
            <Nav1 />
            <br />
            <Container style={{ width: "1000px" }}>
                <br />
                <h4 className="text-center">TOTAL INVOICES</h4>
                <Card style={{ width: "800px", backgroundColor: "pink"}}>
                    <Card.Body>
                        <Card.Title>Total Invoices</Card.Title>
                        <Card.Text>{total}</Card.Text>
                        <Button
                            variant="primary"
                            onClick={() => navigate("/invoicehistory")}
                        >
                            Click Here to see Invoices
                        </Button>
                    </Card.Body>
                </Card>
                <br />
                <Row>
                    <h4 className="text-center">INVOICES STATUS</h4>
                    <Col>
                        <Card
                            style={{
                                width: "15rem",
                                height:"150px",
                                backgroundColor:"lightcyan",
                            }}
                        >
                            <Card.Body className="text">
                                <Card.Title>Paid</Card.Title>
                                <Card.Text>{paid}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card
                            style={{
                                width: "15rem",
                                height:"150px",
                                backgroundColor:"lightcyan",
                                
                                
                            }}
                        >
                            <Card.Body className="text">
                                <Card.Title>Partially Paid</Card.Title>
                                <Card.Text>{partpaid}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card
                            style={{
                                width: "15rem",
                                height:"150px",
                                backgroundColor:"lightcyan"
                            }}
                        >
                            <Card.Body className="text">
                                <Card.Title>Unpaid</Card.Title>
                                <Card.Text>{unpaid}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
            </Container>
        </div>
    );
}
