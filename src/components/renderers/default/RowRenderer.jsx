import React, { useContext } from "react";

// utils
import { computeClasses } from "../utils";
import { FormRendererContext } from "../../FormRenderer";


const computeStyles = (numOfChildren) => {
  // compute the base length we have to work with. Out of 100%
  // also take into account the gap length
  const base = numOfChildren === 1 ? 100 : 100 - ((numOfChildren - 1) * 4);

  // compute the width based off number of fields we're rendering
  const width = base / numOfChildren;

  return {
    display: "grid",
    gridTemplateColumns: `repeat(${numOfChildren}, ${width}%)`,
    gridColumnGap: numOfChildren === 1 ? undefined : "4%",
    marginBottom: "10px",
  };
}

const Row = ({ style = {}, children, ...props }) => {
  const rowStyles = computeStyles(children.length);
  return (
    <div {...props} style={{ ...rowStyles, ...style }}>{children}</div>
  );
};

const RowRenderer = ({ id, fields }) => {
  const {
    renderers,
    rendererProps: { ColRenderer: rowProps },
  } = useContext(FormRendererContext);
  // compute default col size(can be overriden by `field`)
  const colSize = 12 / fields.length;
  const sizes = { xs: colSize, md: colSize };
  // NOTE: Check if we're prop drilling too much -- if so then wrap this in a context

  // compute classes
  const className = computeClasses("row", id, rowProps);
  return (
    <Row {...rowProps} className={className}>
      {
        fields.map((field) => (
          <renderers.ColRenderer key={field.name} colSize={sizes} field={field} />
        ))
      }
    </Row>
  );
};

export default RowRenderer;
