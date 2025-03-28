import {Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { PiBreadBold, PiHamburgerDuotone } from "react-icons/pi";

const Navigationbar = () => {
    return (
        <Navbar expand="sm" bg="primary" variant="dark">
            <div className="container">
                <Link to="/" className="navbar-brand"><PiBreadBold className='react-icons' size='1.75em' /> TFT ScoutDB</Link>
                <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />
                    <Nav>
                        {/* <NavLink eventKey="1" as={Link} to="/about">About</NavLink> */}
                        {/* <NavLink eventKey="2" as={Link} to="/test">Test</NavLink> */}
                        <NavLink eventKey="3" as={Link} to="/settings"><PiHamburgerDuotone className='react-icons' size='2em'/></NavLink>
                    </Nav>
            </div>
        </Navbar>
    );
}

export default Navigationbar;