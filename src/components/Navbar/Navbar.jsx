import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "./navbar.module.css";
import logo from "../../assets/images/nav/logo.svg";
import openBtn from "../../assets/images/nav/open.svg";
import closeBtn from "../../assets/images/nav/close.svg";

function AppNavbar(props) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (!active) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  return (
    <Navbar
      expand="none"
      className={`${active && "shadow"} ${styles.nav} fixed-top`}
      variant="dark"
    >
      <Container fluid className="px-0 pt-2">
        <Link className="ps-4 navbar-brand" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleClick}>
          <img src={active ? closeBtn : openBtn} alt="btn" className="mb-1 pe-md-4 pe-2" />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="pb-3">
          <Nav className="pt-4 px-4">
            <Link to="/" className={styles.link}>
              HOME
            </Link>
            <Link to="/projects" className={styles.link}>
              PROJECTS
            </Link>
            <Link to="/contact" className={styles.link}>
              CONTACT
            </Link>
          </Nav>
          <div className="px-4 mt-3 d-flex d-md-none">
            <Nav.Link
              target="_blank"
              href="https://github.com/vaibhava17"
              className={`${styles.link} me-4`}
            >
              <i className="fab fa-github"></i>
            </Nav.Link>
            <Nav.Link
              target="_blank"
              href="https://www.linkedin.com/in/vaibhava17/"
              className={`${styles.link} me-4`}
            >
              <i className="fab fa-linkedin"></i>
            </Nav.Link>
            <Nav.Link
              target="_blank"
              href="https://twitter.com/_vaibhava__"
              className={`${styles.link} me-4`}
            >
              <i className="fab fa-twitter"></i>
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
