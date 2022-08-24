import React from "react";
import { Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <div className="section d-flex" id="about">
      <div className="my-auto p-md-5 p-3 me-md-5">
        <Row>
          <Col md={4}>
            <h3 className="text-light">Email</h3>
          </Col>
          <Col md={8}>
            <a href="mailto:iamvaibhav.agarwal@gmail.com" target="_blank" rel="noreferrer" >
              <p className="main-text mb-5">iamvaibhav.agarwal@gmail.com</p>
            </a>
          </Col>
          <Col md={4}>
            <h3 className="text-light">Qualification</h3>
          </Col>
          <Col md={8}>
            <p className="main-text mb-5">Bachelor of Technology in Computer Science</p>
          </Col>
          <Col md={4}>
            <h3 className="text-light">Tech Expertise</h3>
          </Col>
          <Col md={8}>
            <div className="main-text mb-5">
              <ul className="fw-normal">
                <li>MERN Stack</li>
                <li>Git/Github</li>
                <li>POSTMAN</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default About;
