import { getOrders } from "../config/Myservice";
import React, { useState, useEffect } from "react";
import { Card, Button, Row, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Getorders() {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getOrders().then((res) => {
      if (res.data.err == 0) {
        setOrder(res.data.data);
        console.log(res.data.data);
      }
    });
  }, []);
  return (
    <div className="mt-4">
      <Container>
        <Table bordered>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Pizza</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {order[0] &&
              order[0].orders.map((order, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td><img src={order.image} width="50" height="50"></img>{order.pname}</td>
                  <td> Rs{order.price}</td>
                  <td>{order.quantity}</td>
                </tr>
              ))}
            <tr>
              <td></td>

              <td colSpan="4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/dashboard")}
                >
                  Order More
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Getorders;
