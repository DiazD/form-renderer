import React, { useContext } from "react";

// utils
import { FormRendererContext } from "../../FormRenderer";

const FormControlWrapperRenderer = ({ field }) => {
  const { renderers } = useContext(FormRendererContext);
  return <renderers.FormControlRenderer field={field} />;
};

export default FormControlWrapperRenderer;
