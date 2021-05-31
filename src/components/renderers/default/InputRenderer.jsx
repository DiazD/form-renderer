import React, { useContext } from "react";

// components
import * as fields from "./fields";

// utils
import { computeClasses } from "../utils";
import { FormRendererContext } from "../../FormRenderer";


const getFormInputType = (inputType) => {
  switch (inputType) {
    case "select":
      return fields.SelectField;
    case "phone":
    case "number":
    case "textarea":
    case "input":
    default:
      return fields.InputField;
  }
};

const fieldType = {
  "select": "select",
  "phone": "tel",
  "number": "number",
  "textarea": "textarea",
  "input": "text",
}

const InputComponent = ({ field, ...props }) => {
  const InputComponent = getFormInputType(field.component);
  const type = fieldType[field.component];

  return <InputComponent field={field} {...props} type={type} />;
};

const InputRenderer = ({ field }) => {
  const {
    overrides,
    rendererProps: { InputRenderer: inputProps },
  } = useContext(FormRendererContext);
  const className = computeClasses("form-control-input", field.name, inputProps);
  const { OverrideInput } = overrides[field.name] || {};
  const props = { ...inputProps, className };

  return OverrideInput ? (
    <OverrideInput field={field} {...props} />
  ) : (
    <InputComponent field={field} {...props} />
  );
};

export default InputRenderer;
