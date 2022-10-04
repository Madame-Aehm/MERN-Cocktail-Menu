import React from 'react'
import { NavLink } from 'react-router-dom';
import lemonImage from "../lemon.png";
import '../css/nav.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {

  return (
    <Navbar collapseOnSelect bg="light" expand="md">
      <Navbar.Brand href="/"><img src={ lemonImage } style={{ height: "30px", width: "auto", marginLeft: "1em" }}/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight: "1em" }}/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink id="links" to={"/home"} style={({isActive}) => ({
            fontWeight: isActive ? 700 : 'inherit',
            cursor: isActive ? "inherit" : "pointer"
          })}>Home</NavLink>
          <NavLink id="links" to={"/login"} style={({isActive}) => ({
            fontWeight: isActive ? 700 : 'inherit',
            cursor: isActive ? "inherit" : "pointer"
          })}>Login</NavLink>
          <input id="search"/><label htmlFor='search'>Search</label>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar