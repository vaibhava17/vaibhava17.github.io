import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Row, Col } from "react-bootstrap";
import AppInput from "../components/Input/Input";
import AppButton from "../components/Button/Button";

const Contact = () => {
  const location = useLocation();
  const form = useRef();
  const [success, setSuccess] = React.useState(0);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ioz692h",
        "template_lf089nj",
        form.current,
        "user_Bm4UgQUDt1izlDwO4JOY0"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(1);
        },
        (error) => {
          console.log(error.text);
          setSuccess(2);
        }
      );
    form.current.reset();
  };

  return (
    <div className="section d-flex position-relative" id="contact">
      <div className="my-auto p-md-5 p-3 me-md-5 w-100">
        {location.pathname === "/contact" ? null : (
          <i className="fas fa-phone-alt position-absolute bg-contact" />
        )}
        <h3 className="text-light text-md-start text-center">Contact</h3>
        <form ref={form} onSubmit={sendEmail}>
          <Row className="contact-form mt-md-5 mt-3">
            <Col md={6}>
              <AppInput
                placeholder="Name"
                name="name"
                id="name"
                className="mb-3"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
                type="text"
              />
            </Col>
            <Col md={6}>
              <AppInput
                placeholder="Email"
                name="email"
                id="email"
                className="mb-3"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                    email: true,
                  },
                ]}
                type="email"
              />
            </Col>
            <Col md={6}>
              <AppInput
                placeholder="Mobile No."
                name="number"
                id="number"
                className="mb-3"
                rules={[
                  {
                    required: true,
                    message: "Please input your mobile number!",
                    min: 10,
                    max: 14,
                  },
                ]}
                type="text"
              />
            </Col>
            <Col md={6}>
              <AppInput
                placeholder="Organization"
                name="organization"
                id="organization"
                className="mb-3"
                type="text"
              />
            </Col>
            <Col md={12}>
              <AppInput
                placeholder="Message"
                name="message"
                id="message"
                className="mb-3"
                textArea
                rules={[
                  {
                    required: true,
                    message: "Please input your message!",
                  },
                ]}
                type="text"
              />
            </Col>
            <Col md={12}>
              <AppButton label="Send" type="submit" />
            </Col>
            <Col md={12}>
              {success === 1 ? (
                <div className="text-light">Success</div>
              ) : success === 2 ? (
                <div className="text-light">Error</div>
              ) : null}
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};

export default Contact;
