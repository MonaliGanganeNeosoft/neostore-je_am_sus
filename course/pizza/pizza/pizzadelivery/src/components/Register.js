import React, { Component } from 'react'
import {Navbar,Container,Card,Form,Image,Row,Col,Button} from 'react-bootstrap'
import axios from 'axios'
import { Link,Redirect,useHistory } from 'react-router-dom';
import { addUser } from '../config/MyService';

const regForName =RegExp(/^[A-Za-z]/);
const regForEve =RegExp(/^(?!^ +$)^.+$/);
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForMobile = RegExp(/^[0-9]{10}$/);


export class Register extends Component {
    constructor(props) {
        super(props)
        
        this.state = { prodata: [], fname: '',  mobile: '',email:'',password:'',confirm_password:'', errors:{
            fname:'',
            mobile:'',
            email:'',
            password:'',
            confirm_password:''
            },
            err:{
            fname:'',
            mobile:'',
            email:'',
            password:'',
            confirm_password:''
         } }
    }
    
    handle = (event) => {
        const { name, value } = event.target
 
        let errors=this.state.errors;
        let err=this.state.err;
        switch(name){
            case 'fname':
                errors.fname=regForName.test(value)?'':'Enter Valid first Name';
                if(errors.fname!==""){err.fname="error"}
                else{err.fname=""}
                break;
         
            case 'mobile':
                errors.mobile=regForMobile.test(value)?'':'Enter Username';
                if(errors.mobile!==""){err.mobile="error"}
                else{err.mobile=""}
                break;
            case 'email':
                errors.email=regForEmail.test(value)?'':'Enter Valid Email';
                if(errors.email!==""){err.email="error"}
                else{err.email=""}
                break;
            case 'password':
                errors.password=regForEve.test(value)?'':'Enter Password';
                if(errors.password!==""){err.password="error"}
                else{err.password=""}
                break;
            case 'confirm_password':
                errors.confirm_password = this.state.password === value?'':"Password and Confirm Password does not match"
                if(errors.confirm_password!==""){err.confirm_password="error"}
                else{err.fname=""}
                break;
            
            }
            this.setState({err,errors,[name]:value},()=>{
                console.log(errors)
            })
    }
    formSubmit=(event)=>{
        event.preventDefault();
        
        if(this.validate(this.state.errors))
        {
            if(this.state.email!=="" && this.state.password!=="" && this.state.fname!=="" && this.state.lname!=="" && this.state.username!==""){
              alert("Details added successfully !!")
               this.add()
            }
            else{
                alert("Failed to Register")
            }
         }
        else {
            alert("Please Enter Valid Details");
        }
     }
      validate=(errors)=>{
         let valid=true;
         Object.values(errors).forEach((val)=> val.length >0 && (valid=false));
         return valid;
     }
    add = (event) => {
        
     
        // const URL = "http://localhost:8000/api/adduser"
        // axios.post(URL, {
        //     name: this.state.fname,
        //     mobile:this.state.mobile,
        //     email:this.state.email,
        //     password: this.state.password 
            
        //     })
        //     .catch(err => { console.log(err) })
        let formData={name:this.state.fname,
                mobile:this.state.mobile,
                email:this.state.email,
                password: this.state.password
            }
            addUser(formData)
        }

    render() {
        const {errors}=this.state;
        return (
           
            <div>
            <div className="mt-5" style={{marginLeft:300}}>
                <Container>
                    <Card style={{width:700,height:850,backgroundColor:"darkslategray"}}>
                        <Card>
                    <Card.Body>
                    <Navbar>
                <Container>
                    <Navbar.Brand>
                        <Image src="./Images/pizza.jpg" alt="Pizza Logo" style={{height:80,width:80}} roundedCircle />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Button variant="outline-dark" href="/SignIn">Sign In</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
                    </Card.Body>
                    </Card>
                    
            <Container className="mt-5">
                <Row>
                    <Col md={6}>
                <Card style={{ width:550,height:600,marginLeft:55}}>
                <i class="far fa-registered fa-3x"></i>
                    <Card.Title className="mt-1"><h3>Register Here!</h3></Card.Title>
                    <Card.Body>
                        <Form onSubmit={this.formSubmit} method="post">
                            <Form.Group className="mb-3">
                                <Form.Label> Name *</Form.Label>
                                <Form.Control type="text" placeholder="Name" onChange={this.handle} name="fname"/>
                                {errors.fname.length>0 && <span style={{color:'red'}}>{errors.fname}</span>}<br/>
                            </Form.Group>

                            <Form.Group className="mb-3 mt-1">
                                <Form.Label>Email*</Form.Label>
                                <Form.Control type="email" placeholder="Email" onChange={this.handle} name="email"/>
                                {errors.email.length>0 &&  <span style={{color:'red'}}>{errors.email}</span>}<br/>
                            </Form.Group>

                            <Form.Group className="mb-3 mt-1">
                            <Form.Label>Contact No</Form.Label>
                                <Form.Control type="number" placeholder="Contact" onChange={this.handle} name="mobile"/>
                                {errors.mobile.length>0 && <span style={{color:'red'}}>{errors.mobile}</span>}<br/>
                            </Form.Group>

                            <Form.Group className="mb-3 mt-1">
                            <Form.Label>Password</Form.Label>
                                <Form.Control type="text" placeholder="Password" onChange={this.handle} name="password"/>
                                {errors.password.length>0 && <span style={{color:'red'}}>{errors.password}</span>}<br/>
                            </Form.Group>

                            <Form.Group className="mb-3 mt-1">
                            <Form.Label> Confirm Password</Form.Label>
                                <Form.Control type="text" placeholder=" confirm Password" onChange={this.handle} name="confirm_password"/>
                                {errors.confirm_password.length>0 &&  <span style={{color:'red'}}>{errors.confirm_password}</span>}<br/>
                            </Form.Group>
                        </Form>
                        <Button variant="primary" type="submit" value="add" style={{marginLeft:200}} href="/SignIn">
                               Submit
                            </Button>
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
}

export default Register