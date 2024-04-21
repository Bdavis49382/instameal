import { Navbar, Container, Nav} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
export default function Header() {
    return (
        <>
            <Navbar expand="lg" sticky="top" className="bg-body-secondary">
                <Container className="ms-0">
                    <Navbar.Brand href="instameal" className="fs-1 pe-3">Instameal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav variant="pills" className="fs-5">
                            <LinkContainer to="/instameal">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/inventory/YwuLfa7WCCQcg9Wk7xrl">
                                <Nav.Link>Inventory</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/recipes/YwuLfa7WCCQcg9Wk7xrl">
                                <Nav.Link>Recipes</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/meals/YwuLfa7WCCQcg9Wk7xrl">
                                <Nav.Link>Meals</Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>
        </>
        // <div style={{backgroundColor:'gray',height:'100vw'}}>
        //     <ul style={{marginTop:'20vw',padding:0}}>
        //         <li onClick={() => setScreen('meals')} style={optionStyle}>Meals</li>
        //         <li onClick={() => setScreen('recipes')}style={optionStyle}>Recipes</li>
        //         <li onClick={() => setScreen('inventory')}style={optionStyle}>Inventory</li>
        //     </ul>
        // </div>
    )
}