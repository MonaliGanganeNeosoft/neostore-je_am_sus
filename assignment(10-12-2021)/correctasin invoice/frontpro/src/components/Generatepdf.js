import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import Nav1 from "./Nav1";
import { getInvoice } from "../config/MyService";
import ReactToPdf from "react-to-pdf";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { sendMail } from "../config/MyService";

const ref = React.createRef();

export default function Generatepdf() {
    const [state, setState] = useState([]);
    const [items, setItems] = useState([]);
    // const [user, setUser] = useState([]);
    let id = JSON.parse(localStorage.getItem("invoicenumber"));
    useEffect(() => {
        getInvoice().then((res) => {
            console.log(id);
            const match = res.data.filter((data) => {
                console.log(id);
                console.log(data.innumber);
                if (data.innumber === id) {
                    console.log(data);
                    let product = [];
                    data.items.forEach((ele) => {
                        product.push(ele);
                    });
                    setItems(product);
                    return data;
                }
            });
            setState(match);
        });
    }, []);
    console.log(state);
    console.log(items);
    // debugger;
    console.log(ref);

    const generatePdf = () => {
        const input = document.getElementById("divToPrint");
        console.log(input);
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
            );
            pdf.addImage(img, "JPEG", 0, 0);
            pdf.save("download.pdf");
        });
    };

    const sendmail = () => {
        const input = document.getElementById("divToPrint");
        console.log(input);
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
            );
            pdf.addImage(img, "JPEG", 0, 0);
            const filedata = pdf.output("blob");
            console.log(filedata);
            let formData = new FormData();
            formData.append("file", filedata, "samplefile");
            console.log("calling");
            sendMail(formData).then((res) => {
                console.log(res);
                console.log("in response");
            });
            console.log("call finished");
        });
    };

    return (
        <div>
            <Nav1 />
            <br />
            <Container>
                <div className="text-center">
                    {/* <ReactToPdf targetRef={ref} filename="invoice.pdf">
                        {({ toPdf }) => (
                            <Button variant="success" onClick={toPdf}>
                                Generate PDF
                            </Button>
                        )}
                    </ReactToPdf>
                    {console.log(ref)} */}
                    <Button variant="success" onClick={() => generatePdf()}>
                        Generate the PDF
                    </Button>
                    &nbsp;
                    <Button variant="primary" onClick={() => sendmail()}>
                        Send by Email
                    </Button>
                </div>
            </Container>
            <br />
            <Container
                style={{
                    border: "2px solid black",
                    width: "800px",
                }}
                ref={ref}
                id="divToPrint"
            >
                <div style={{ backgroundColor: "white" }}>
                    <Row>
                        <Col md={9}>
                            <div>
                                <Image
                                    src="https://dashboard.getinvoice.co/dboard/img/logo.png"
                                    width="100px"
                                    height="80px"
                                />
                            </div>
                        </Col>
                        <Col md={3}>
                            <h2>INVOICE</h2>
                            <p>Number: {id}</p>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col md={9}>
                            <p>
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        color: "gray",
                                    }}
                                >
                                    FROM
                                </span>
                                <br />
                                <span style={{ fontWeight: "bold" }}>
                                    ShrashtaTach
                                    <br/>
                                    
                                </span>
                                <p >AMAEDEEP COLONY,RAHATANI
                                    PUNE-17</p>
                                <br />
                                shrashtaTach@.com
                                <br />
                                9898989898
                            </p>
                            <br />
                            <p>
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        color: "gray",
                                    }}
                                >
                                    Bill to
                                </span>
                                <br />
                                {state.map((value, index) => {
                                    return (
                                        <>
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                {value.recname}
                                            </span>
                                            <br />
                                            {value.recemail}
                                            <br />
                                            {value.recmobile}
                                            <br />
                                            {value.recaddress}
                                        </>
                                    );
                                })}
                            </p>
                        </Col>
                        <Col md={3}>
                            {state.map((value, index) => {
                                return (
                                    <div>
                                        <p>
                                            <span
                                                style={{
                                                    // fontWeight: "bold",
                                                    color: "gray",
                                                }}
                                            >
                                                Status
                                            </span>
                                            <br />
                                            <span
                                                style={{
                                                    // fontWeight: "bold",
                                                    color: "red",
                                                }}
                                            >
                                                {value.status}
                                            </span>
                                            <br />
                                        </p>
                                        <p>
                                            <span
                                                style={{
                                                    // fontWeight: "bold",
                                                    color: "gray",
                                                }}
                                            >
                                                Date
                                            </span>
                                            <br />
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                {value.indate}
                                            </span>
                                            <br />
                                        </p>
                                        <p>
                                            <span
                                                style={{
                                                    // fontWeight: "bold",
                                                    color: "gray",
                                                }}
                                            >
                                                Due Date
                                            </span>
                                            <br />
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                {value.duedate}
                                            </span>
                                            <br />
                                        </p>
                                        <p>
                                            <span
                                                style={{
                                                    // fontWeight: "bold",
                                                    color: "gray",
                                                }}
                                            >
                                                Amount
                                            </span>
                                            <br />
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                &#8377; {value.total}
                                            </span>
                                            <br />
                                        </p>
                                    </div>
                                );
                            })}
                        </Col>
                    </Row>
                </div>
                <div>
                    <Table  bordered size="sm" border={3}>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Discount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{value.title}</td>
                                        <td>{value.quantity}</td>
                                        <td>&#8377; {value.price}</td>
                                        <td>{value.discount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <span style={{ fontWeight: "bold" }}>Payment Terms and conditions:</span>
                    <br />
                    Pls pay all amount within 10 days.
                    <p>
                    A Terms & Conditions (T&C) agreement is an important agreement for all businesses, including small businesses. It dictates the rules for your products and services and lays out expectations for you and your customers. ... Once complete, you will have an agreement capable of protecting your interests and your bottom line.
                    </p>
                </div>
                <br />
            </Container>
        </div>
    );
}
