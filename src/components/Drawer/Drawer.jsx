import React from "react";
import { Drawer, Timeline } from "antd";
import styles from "./drawer.module.css";



function AppDrawer(props) {
  const { onClose, visible, data } = props;

  return (
    <>
      <Drawer
        width={500}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        className={styles.drawer}
        drawerStyle={{ backgroundColor: "var(--bg-primary-color)" }}
      >
        <h3 className="text-center text-light mb-5">About Me</h3>
        <Timeline mode="alternate">
          {data.map((item, index) => (
            <Timeline.Item key={index} color={item.color}>
              {item.text}
            </Timeline.Item>
          ))}
        </Timeline>
      </Drawer>
    </>
  );
}

export default AppDrawer;
