import React from "react";
import {  Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="m-2">
      <Container className="text-start    " style={{ backgroundColor: "pink" }}>
        <Row className=" m-3 p-5 ">
          <h1 className="mb-4">Pizza Delivery</h1>

          <p>Welcome to pizza delivery service. </p>
          <hr />
          <p className="fw-bold">
            we're performing delivery free of charge in case if your order is
            higher than 600
          </p>
          <Button
            onClick={() => navigate("/signup")}
            variant="secondary allign-center mt-10"
            size="lg"
          >
            Pls sign in to login
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
