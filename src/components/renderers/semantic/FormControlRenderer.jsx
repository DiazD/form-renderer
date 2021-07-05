import React, { useContext } from "react";
import { Form } from "semantic-ui-react";
import * as fields from "./fields";

// utils
import { computeClasses } from "../utils";
import { FormRendererContext } from "../../FormRenderer";
import { useFormState } from "react-hook-form";

const controlStyles = {
  display: "flex",
  flexDirection: "column"
};

const getFormControl = (component) => {
  return fields[component];
};

const defaultErrorProps = { pointing: "above" };

const getError = (errors, name, errorProps = defaultErrorProps) =>
  errors[name] ? { content: errors[name].message, ...errorProps } : undefined;

const FormControlComponent = ({ field, renderers, style, ...formCtrlProps }) => {
  const { errors } = useFormState();
  const { errorProps, ...formFieldProps } = formCtrlProps;

  // get component to render and any errors 
  const FormControl = getFormControl([field.component]);
  const error = getError(errors, field.name, errorProps);

  return (
    <Form.Field
      style={{ ...controlStyles, ...style }}
      {...formFieldProps}
      id={`form-control-${field.name}`}
      label={field.label}
      control={FormControl}
      error={error}
      field={{ ...field }}
    />
  )
};

const FormControlRenderer = ({ field }) => {
  const {
    overrides,
    renderers,
    rendererProps: { FormControlRenderer: formCtrlProps },
  } = useContext(FormRendererContext);
  const className = computeClasses("form-control", field.name, formCtrlProps);
  const { OverrideFieldControl } = overrides[field.name] || {};
  const formControlProps = { ...formCtrlProps, className };

  return OverrideFieldControl ? (
    <OverrideFieldControl field={field} {...formControlProps} />
  ) : (
    <FormControlComponent field={field} {...formControlProps} renderers={renderers} />
  );
};

export default FormControlRenderer;
