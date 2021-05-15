import React, { useContext } from "react";

// utils
import { computeClasses } from "../utils";
import { FormRendererContext } from "../../FormRenderer";

const FormControlComponent = ({ field, renderers, ...formCtrlProps }) => {
  return (
    <div {...formCtrlProps}>
      <renderers.LabelRenderer field={field} />
      <renderers.InputRenderer field={field} />
      <renderers.ErrorRenderer field={field} />
    </div>
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
