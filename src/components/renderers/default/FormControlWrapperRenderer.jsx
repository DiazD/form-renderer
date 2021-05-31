import React, { useContext } from "react";

// utils
import { computeClasses } from "../utils";
import { FormRendererContext } from "../../FormRenderer";

const FormControlWrapperRenderer = ({ field }) => {
  const {
    renderers,
    rendererProps: { FormControlWrapperRenderer: formCtrlWrapperProps },
  } = useContext(FormRendererContext);
  const className = computeClasses("form-control-wrapper", field.name, formCtrlWrapperProps);
  return (
    <div {...formCtrlWrapperProps} className={className}>
      <renderers.FormControlRenderer field={field} />
    </div>
  );
};

export default FormControlWrapperRenderer;
