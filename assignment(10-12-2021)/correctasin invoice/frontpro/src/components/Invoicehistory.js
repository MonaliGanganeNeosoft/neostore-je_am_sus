import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import Nav1 from "./Nav1";
import { getInvoice } from "../config/MyService";

export default function Invoicehistory() {
    const [state, setState] = useState([]);

    useEffect(() => {
        getInvoice().then((res) => {
            setState(res.data);
        });
    });
    return (
        <div>
            <Nav1 />
            <br />
            <Container>
                <Table  bordered hover>
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Name</th>
                            <th>Invoice Number</th>
                            <th>Status</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {state.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{value.recname}</td>
                                    <td>{value.innumber}</td>
                                    <td>{value.status}</td>
                                    {/* <td>
                                        <Button variant="success">Edit</Button>
                                    </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}
