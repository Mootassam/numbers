import React from "react";
import PropTypes from "prop-types";

function InputFormItem(props) {
  const { name, type, placeholder, required, disabled, label, errorMessage } =
    props;
  return (
    <div className={`form__group ${errorMessage ? "has-error" : ""}`}>
      <label htmlFor={name} className={`${errorMessage ? "error-message" : null}`}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={errorMessage ? "error" : ""}
        placeholder={placeholder || undefined}
        disabled={disabled}
        onChange={(event) => {
          props.onChange && props.onChange(event.target.value);
        }}
        value={props.value} 
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

InputFormItem.defaultProps = {
  type: "text",
  required: false,
};
InputFormItem.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default InputFormItem;
