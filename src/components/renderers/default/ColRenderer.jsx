import React, { useContext } from "react";

// utils
import { computeClasses } from "../utils";
import { FormRendererContext } from "../../FormRenderer";

const Col = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

const ColRenderer = ({ field }) => {
  const {
    renderers,
    rendererProps: { ColRenderer: colProps },
  } = useContext(FormRendererContext);
  const sizes = field.colSize || colProps.colSize; // allow field to define a col size or default to computed one
  const className = computeClasses("col", field.name, colProps);

  return (
    <Col {...colProps} className={className} {...sizes}>
      <renderers.FormControlWrapperRenderer field={field} />
    </Col>
  );
};

export default ColRenderer;
