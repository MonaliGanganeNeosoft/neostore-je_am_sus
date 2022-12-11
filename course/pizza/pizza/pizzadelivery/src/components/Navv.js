import React from 'react'
import{Navbar,Nav,Container,Button,Image} from 'react-bootstrap'

function Navv() {
    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand>
                        <Image src="./Images/pizza.jpg" alt="Pizza Logo" style={{height:80,width:80}} roundedCircle />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Nav.Link href="#home">Profile</Nav.Link>
                    <Nav.Link href="#features">Menu</Nav.Link>
                    <Nav.Link href="#pricing">Cart</Nav.Link>
                    <Button variant="outline-dark" href="/FrontPage">Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navv
