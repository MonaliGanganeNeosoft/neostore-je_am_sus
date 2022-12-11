import React from 'react'
import{Card,Button,Image,Navbar,Nav,Container} from 'react-bootstrap'

function FrontPage() {
    return (
        <div>
            <div className="container mt-5">
            <div>
            <Card>
                <Card.Body>
                <Navbar>
                <Container>
                    <Navbar.Brand>
                        <Image src="./Images/pizza.jpg" alt="Pizza Logo" style={{height:80,width:80}} roundedCircle />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Button variant="outline-dark" className="mr-3" href="/SignIn">Sign In</Button>
                    <Button variant="outline-dark" className="ml-4" href="/Register">Sign Up</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
                </Card.Body>
            </Card>
            </div>
            <div className="mt-4">
                <Card style={{height:300}}>
                    <Card.Body>
                    <Card.Title> <h2>Pizza Delivery </h2></Card.Title>
                    <Card.Text>
                       Welcome to pizza delivery service.This is the place when you may choose the 
                       most delecious pizza you like form wide variety of options!
                       <hr/>
                       We are performing delivery free of charge in case if your order is higher than rs.500
                    </Card.Text>
                    <Button variant="dark" href="/SignIn">Sign In and Order</Button>
                    </Card.Body>
                </Card>
            </div>
            </div>
            
        </div>
    )
}
export default FrontPage;
