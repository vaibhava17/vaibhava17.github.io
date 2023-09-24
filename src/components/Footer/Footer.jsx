import React from "react";
import { Container, Row } from "react-bootstrap";
import styles from "./footer.module.css";

function AppFooter({ url = "https://github.com/sponsors/vaibhava17?o=esb" }) {

  return (
    <div className="fixed-bottom">
      <Container>
        <Row className={`py-4 ${styles.footer}`}>
          <span>
            FOLLOW
            <a href="https://github.com/vaibhava17" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github" />
            </a>
            <a href="https://www.linkedin.com/in/vaibhava17/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin" />
            </a>
            <a href="https://twitter.com/heyvybav" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter" />
            </a>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <button className="text-muted border-0 bg-transparent"  >
                <i className="fas fa-heart" />
              </button>
            </a>
          </span>
        </Row>
      </Container>
    </div>
  );
}

export default AppFooter;
