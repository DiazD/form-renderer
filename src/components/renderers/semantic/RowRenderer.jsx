import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";

// utils
import { computeClasses } from "../utils";
import { FormRendererContext } from "../../FormRenderer";

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
    <Grid.Row {...rowProps} className={className} columns={fields.length}>
      {
        fields.map((field) => (
          <renderers.ColRenderer key={field.name} colSize={sizes} field={field} />
        ))
      }
    </Grid.Row>
  );
};

export default RowRenderer;
