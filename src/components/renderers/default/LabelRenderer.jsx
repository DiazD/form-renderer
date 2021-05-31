import React, { useContext } from "react";

// components
import { RedAsterisk } from "../../FormFieldRenderer";

// utils
import { computeClasses } from "../utils";
import { getIn } from "../../../utils";
import { FormRendererContext } from "../../FormRenderer";


const shouldShowAsterisk = (field) => {
  if (typeof field.rules === "function") {
    // special case when we pass `rules` as a function
    return getIn(["required"], field.rules({}));
  }
  return getIn(["rules", "required"], field);
};

const labelStyles = {
  fontWeight: "bold",
  textAlign: "left",
  textTransform: "capitalize",
};

const FieldLabelComponent = ({ field, style = {}, ...props }) => {
  const isFieldRequired = shouldShowAsterisk(field);

  return (
    <label style={{ ...labelStyles, ...style }} {...props} htmlFor={field.name}>
      {field.name}
      {isFieldRequired ? <RedAsterisk /> : null}
    </label>
  );
};

const LabelRenderer = ({ field }) => {
  const {
    overrides,
    rendererProps: { LabelRenderer: props },
  } = useContext(FormRendererContext);
  const className = computeClasses("form-control-label", field.name, props);
  const { OverrideLabel } = overrides[field.name] || {};
  const labelProps = { ...props, className };
  return OverrideLabel ? (
    <OverrideLabel field={field} {...props} />
  ) : (
    <FieldLabelComponent field={field}  {...labelProps} />
  );
};

export default LabelRenderer;
