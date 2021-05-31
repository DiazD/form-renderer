import React, { useRef } from "react";
import { useFormContext, useWatch, useFormState } from "react-hook-form";
import styled from "styled-components/macro";

// components
import InputGroupBorder from "./InputGroupBorder";
import { AutoSizedTextArea } from "./TextArea";
import { StyledError } from "../FormFieldRenderer";

const maxNumChars = 250;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  margin-right: 0.5em;
`;

const MessageCountLabel = ({ field, methods }) => {
  const message = useWatch({ name: field.name, control: methods.control, defaultValue: "" });
  return (
    <div className="d-flex justify-content-between mb-1">
      <span></span>
      <span className="charCount d-flex align-items-center">
        {message.length <= maxNumChars && message.length > maxNumChars / 2
          ? <Circle $color="yellow" />
          : maxNumChars < message.length
            ? <Circle $color="red" />
            : <Circle $color="green" />}
        {message.length}/{maxNumChars} Characters
      </span>
    </div>
  );
};

const Error = ({ field }) => {
  const { errors } = useFormState();
  return (
    <StyledError >{errors[field.name]}</StyledError>
  );
}

const TemplateTextArea = ({ field }) => {
  const methods = useFormContext();
  const { ref, ...registerProps } = methods.register(field.name, field.rules);
  const textAreaRef = useRef();

  return (
    <>
      <MessageCountLabel field={field} methods={methods} />
      <InputGroupBorder border="full">
        <AutoSizedTextArea
          inputProps={{
            type: "textarea",
            rows: "3",
            name: field.name,
          }}
          innerRef={ref}
          textAreaRef={textAreaRef}
          {...registerProps}
        />
      </InputGroupBorder>
      <Error field={field} />
    </>
  );
};

export default TemplateTextArea;
