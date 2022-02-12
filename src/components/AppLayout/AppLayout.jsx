import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import ReactPageScroller from "react-page-scroller";

function AppLayout(props) {
  const { children, nav, buttons, footer, singlePage } = props;
  return (
    <Container fluid>
      {nav}
      <Row>
        <Col md={1} className="d-none d-md-flex">
          {buttons}
        </Col>
        <Col md={11}>
          {singlePage ? (
            <>{children}</>
          ) : (
            <ReactPageScroller
              containerHeight="100vh"
              containerWidth="100%"
              className="ms-auto"
            >
              {children}
            </ReactPageScroller>
          )}
        </Col>
        <Col md={12} className="d-none d-md-block">
          {footer}
        </Col>
      </Row>
    </Container>
  );
}

export default AppLayout;
