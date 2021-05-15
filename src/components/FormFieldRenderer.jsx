import React from "react";
import styled from "styled-components/macro";

export const RedSpan = styled.span`
  color: red !important;
`;

export const StyledError = styled.span`
  color: var(--red);
  margin-top: 0.75em;
`;

export const RedAsterisk = () => <RedSpan>*</RedSpan>;

const FormFieldsRenderer = ({ fields, overrides = {}, renderers }) => {
  return fields.map((group, idx) =>
    <renderers.RowRenderer key={idx} fields={group} id={idx} renderers={renderers} overrides={overrides} />
  );
};

export default React.memo(FormFieldsRenderer);
