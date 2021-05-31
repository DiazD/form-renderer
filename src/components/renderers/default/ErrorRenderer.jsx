import React, { useContext } from "react";
import { useFormState } from "react-hook-form";

// utils
import { computeClasses } from "../utils";
import { FormRendererContext } from "../../FormRenderer";

const style = {
  color: "red",
  marginTop: "0.3rem",
  textAlign: "left",
  fontSize: "0.8rem",
};

const ErrorComponent = ({ field }) => {
  const { errors } = useFormState();
  const { message = "" } = errors[field.name] || {};

  return <span style={style}>{message}</span>;
};

const ErrorRenderer = ({ field }) => {
  const {
    overrides,
    rendererProps: { ErrorRenderer: props },
  } = useContext(FormRendererContext);
  const className = computeClasses("form-control-error", field.name, props);
  const { OverrideError } = overrides[field.name] || {};
  const errorProps = { ...props, className };

  return OverrideError ? (
    <OverrideError field={field} {...props} />
  ) : (
    <ErrorComponent field={field}  {...errorProps} />
  );
};

export default ErrorRenderer;
