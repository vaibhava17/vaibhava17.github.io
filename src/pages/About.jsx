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
            <p className="main-text mb-5">iamvaibhav.agarwal@gmail.com</p>
          </Col>
          <Col md={4}>
            <h3 className="text-light">Qualification</h3>
          </Col>
          <Col md={8}>
            <p className="main-text mb-5">Computer Science Engineer</p>
          </Col>
          <Col md={4}>
            <h3 className="text-light">Goals for 2022</h3>
          </Col>
          <Col md={8}>
            <div className="main-text mb-5">
              <ul className="fw-normal">
                <li>Become a Full Stack Developer</li>
                <li> Get a Full Time Job </li>
                <li>Improve my skills in Python and Java</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default About;
