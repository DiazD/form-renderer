import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";

// utils
import { computeClasses } from "../utils";
import { FormRendererContext } from "../../FormRenderer";

const ColRenderer = (props) => {
  const { field } = props;
  const {
    renderers,
    rendererProps: { ColRenderer: colProps },
  } = useContext(FormRendererContext);
  const className = computeClasses("col", field.name, colProps);

  return (
    <Grid.Column {...colProps} className={className}>
      <renderers.FormControlWrapperRenderer field={field} />
    </Grid.Column>
  );
};

export default ColRenderer;
