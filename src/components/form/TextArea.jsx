import React from "react";
import { Input } from "reactstrap";

export const AutoSizedTextArea = ({
  textAreaRef,
  inputProps,
  innerRef,
  onChange = () => null,
  ...props
}) => {
  const onTextAreaChange = (e) => {
    textAreaRef.current.style.height = `${e.target.scrollHeight}px`;
    onChange(e);
  };

  return (
    <Input
      {...inputProps}
      innerRef={(e) => {
        textAreaRef.current = e;
        innerRef(e);
      }}
      onChange={onTextAreaChange}
      {...props}
    />
  );
};
