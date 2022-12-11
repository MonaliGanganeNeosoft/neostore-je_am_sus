import React, { useState, useEffect } from 'react'
// import json from '../cred.json';
import {useHistory,Link} from 'react-router-dom'
import {verify} from '../config/MyService'
import axios from 'axios';
import {Form,Card,Button,Image,Container,Navbar,Row,Col} from 'react-bootstrap'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [proData, setProData] = useState([])
    // const [userData, setUserData] = useState([])
    const History =useHistory();

    useEffect(() => {
       verify()
          .then(res=>{
            console.log(res.data);
            setProData(res.data.data);
        })
        console.log(proData)
        
        
    }, [])
    console.log(proData)
    const handler = (e) => {
        e.preventDefault();

        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value)
                break;
            case 'password': setPassword(e.target.value)
                break;
            default: console.log("Nothing Matches")
                break;
            }
        }
    
    const formsubmit = (e) => {
        e.preventDefault();
        let formdata = {
            email: email,
            password: password
        }
        console.log(formdata)
        let flag = 0;
        for (var i = 0; i < proData.length; i++) {
            if (proData[i].email === formdata.email && proData[i].password === formdata.password) {
                alert("Login Successful")
                localStorage.setItem('userdetails', formdata.email);
                flag = 1;
                History.push("/Dash")
            }
          
        }
        if (flag === 0) {
            alert("Enter valid credentials")
        }
    }

    return (
        <div>
<div className="mt-5" style={{marginLeft:300}}>
    <Container>
        <Card style={{width:700,height:550,backgroundColor:"crimson"}}>
            <Card>
        <Card.Body>
        <Navbar>
    <Container>
        <Navbar.Brand>
            <Image src="./Images/pizza.jpg" alt="Pizza Logo" style={{height:80,width:80}} roundedCircle />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Button variant="outline-dark" className="ml-4" href="/Register">Sign Up</Button>
        </Navbar.Collapse>
    </Container>
</Navbar>
        </Card.Body>
        </Card>
<Container className="mt-4">
    <Row>
        <Col md={6}>
    <Card style={{ width:550,height:350 ,marginLeft:60}}>
    <i class="fas fa-user-circle fa-3x"></i>
        <Card.Title className="mt-1"><h3>Login</h3></Card.Title>
        <Card.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={handler} name="email" />
                </Form.Group>

                <Form.Group className="mb-3 mt-1" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handler} name="password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={formsubmit} >
                   Login
                </Button>
            </Form>
        </Card.Body>
    </Card>
    </Col>
    </Row>
</Container>
</Card>
</Container>
</div>
</div>
)
}


