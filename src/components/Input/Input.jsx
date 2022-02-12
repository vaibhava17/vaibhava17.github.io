import React from "react";
import { Input, Form } from "antd";
import styles from "./input.module.css";
const { TextArea } = Input;

function AppInput(props) {
  const {
    placeholder="Enter",
    textArea = false,
    value,
    name,
    id,
    className,
    type,
    onChange,
    size = "large",
    prefix,
    suffix,
    rules,
    disabled,
  } = props;
  return (
    <>
      <Form.Item
        name={name}
        rules={rules}
        // rules={touched && error ? error : ""}
      >
        {textArea ? (
          <TextArea
            rows={3}
            placeholder={placeholder}
            className={`${styles.textArea} text-dark bg-light pt-3 ${className}`}
            bordered={false}
            value={value}
            name={name}
            id={id}
            prefix={prefix}
            suffix={suffix}
            size={size}
            type={type}
            disabled={disabled}
            onChange={onChange}
          />
        ) : (
          <Input
            placeholder={placeholder}
            className={`${styles.input} text-dark bg-light rounded-pill ${className}`}
            bordered={false}
            value={value}
            name={name}
            id={id}
            type={type}
            prefix={prefix}
            suffix={suffix}
            size={size}
            disabled={disabled}
            onChange={onChange}
          />
        )}
      </Form.Item>
    </>
  );
}

export default AppInput;
