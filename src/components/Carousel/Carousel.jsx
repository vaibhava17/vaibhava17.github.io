import React from "react";
import styles from "./carousel.module.css";
import { Carousel } from "antd";

function AppCarousel(props) {
  const { data } = props;
  return (
    <Carousel effect="fade" autoplay>
      {data.map((item, index) => (
        <div key={index} className="d-flex">
          <div
            style={{ backgroundImage: `url(${item.image})` }}
            className={`${styles.card} mx-auto d-flex text-start align-items-end`}
          >
            {/* <img src={item.image} alt={item.title} className={styles.image} /> */}
            <div className={styles.tint} />
            <div className={`${styles.details} w-100`}>
              <div
                className={`${styles.label} w-100 d-flex justify-content-between align-items-end`}
              >
                <h3 className={`text-light ps-md-5 ps-3 m-0`}>
                  {item.title}
                </h3>
                <div className="pe-3 pe-md-5 d-flex fs-3">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe-asia me-3" />
                  </a>
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github" />
                  </a>
                </div>
              </div>
              <div
                className={`px-3 px-md-5 my-3 d-flex w-100 ${styles.description}`}
              >
                <p>
                  <u>About this Project</u>:<span> {item.description}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default AppCarousel;
