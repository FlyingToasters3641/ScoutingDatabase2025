import {Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigationbar = () => {
    return (
        <Navbar expand="sm" bg="primary" variant="dark">
            <div className="container">
                <div className="navbar-brand">Toaster's Scouting</div>
                <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />
                    <Nav>
                        <NavLink eventKey="1" as={Link} to="/">Home</NavLink>
                        <NavLink eventKey="2" as={Link} to="/about">About</NavLink>
                        <NavLink eventKey="3" as={Link} to="/test">Test</NavLink>
                    </Nav>
            </div>
        </Navbar>
    );
}

export default Navigationbar;