import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  return (
    <Navbar style={{ backgroundColor: "#e4e6eb", boxShadow: "1px 1px 2px grey" }}>
      <Container>
        <Navbar.Brand className="navbar-left">
          <NavLink to="/">Category</NavLink>
        </Navbar.Brand>
        <Navbar.Brand className="navbar-left">
          <NavLink to="/products">Products</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button variant="outline-secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
