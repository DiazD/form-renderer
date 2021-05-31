import React from "react"
import { useFormContext, useFormState } from "react-hook-form";

export const InputField = ({ field, ...props }) => {
  const { name, inputProps = {}, rules = {} } = field;
  const { register } = useFormContext();
  const { errors } = useFormState();
  const { style } = props;
  const inputStyles = {
    ...style,
    border: `1px solid ${errors[field.name] ? "red" : "var(--mediumGray)"}`,
    padding: "5px 10px",
  }
  return (
    <input
      key={name}
      name={name}
      {...props}
      {...inputProps}
      {...register(name, rules)}
      style={inputStyles}
    />
  );
};

export const SelectField = ({ field, ...props }) => {
  const { name, inputProps = {}, rules = {} } = field;
  const { register } = useFormContext();
  const { errors } = useFormState();
  const { style } = props;
  const inputStyles = {
    ...style,
    border: `1px solid ${errors[field.name] ? "red" : "var(--mediumGray)"}`,
    padding: "5px 10px",
  }
  return (
    <select
      key={name}
      name={name}
      {...props}
      {...inputProps}
      {...register(name, rules)}
      style={inputStyles}
    >
      {inputProps.options.map((option) => (
        <option key={option.value} id={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}
