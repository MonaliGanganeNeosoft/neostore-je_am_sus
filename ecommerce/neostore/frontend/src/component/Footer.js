import React, { useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
const regExpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
export default function Footer() {
    const [email, setEmail] = useState('')
    return (<>
        <div className="customneofooter">
            <div>
                <h3>About Company</h3>
                <ul>
                    <li><p>Neosoft Technologies is here at your quick and easy for shopping.</p></li>
                    <li>Contact information</li>
                    <li>Email: contact@neosoftmail.com</li>
                    <li>Phone: +91 0000000000</li>
                    <li>MUMBAI,INDIA</li>
                </ul>
            </div>
            <div>
                <h3>information</h3>
                <ul >
                    <li><span><a href="terms.pdf" target="_blank">Terms and Conditions</a></span></li>
                    <li><span>Gurantee and Return Policy</span></li>
                    <li><span>Contact Us</span></li>
                    <li><span>Privacy Policy</span></li>
                    <li><span>Locate Us</span></li>
                </ul>
            </div>
            <div>
                <h3>Newsletter</h3>
                <ul>
                    <li>Signup to get exclusive offer from our favorite brands and to be well up in the news.</li>
                    <br />
                    <li>
                        <Form className="d-flex">
                            <FormControl
                                type="email"
                                placeholder="your email..."
                                className="me-2 ms-2"
                                aria-label="your email..."
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form>
                        <p className="text-danger">{email.length != 0 ? (!regExpEmail.test(email) ? "Invalid email" : "") : ""}</p>
                    </li>
                    <br />
                    <li><Button variant="light" onClick={() => email.length != 0 ? (!regExpEmail.test(email) ? "" : "") : ""}>Subscribe</Button></li>
                </ul>
            </div>
        </div>
        <p style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', wordBreak: 'break-word', margin: '0', borderBottom: '3px solid grey', paddingBottom: '15px' }}>Copyright 2017 NeoSOFT Technologies All rights reserved | Design By Monali Gangane</p>
    </>
    )
}
