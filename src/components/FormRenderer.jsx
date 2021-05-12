import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "reactstrap";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components/macro";

import FormFieldsRenderer, { StyledError } from "./FormFieldRenderer";
import { LoadingButton } from "./Buttons";

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.position === "right"
      ? "flex-end"
      : props.position === "left"
        ? "flex-start"
        : props.position === "center"
          ? "center"
          : null};
  align-items: center;
  /** if there are two buttons, only apply the style on the last last child */
  button:first-child:nth-last-child(2),
  button:first-child:nth-last-child(1) ~ button {
    margin-right: var(--pad1);
  }
`;

ButtonsContainer.propTypes = {
  /** This determine the position of the buttons in the container */
  position: PropTypes.oneOf(["right", "left", "center"]),
};
ButtonsContainer.defaultProps = {
  position: "right",
};

const defaultProps = {
  RowRenderer: {},
  ColRenderer: {},
  FormControlWrapperRenderer: {},
  FormControlRenderer: {},
  InputRenderer: {},
  LabelRenderer: {},
  ErrorRenderer: {},
}

// setup the context
export const FormRendererContext = React.createContext();

const FormRenderer = ({
  fields = [],
  overrides = {},
  onSubmit: submit,
  buttonProps = { name: "Submit", block: false, className: "" },
  formWrapper = null,
  formId = "",
  rhfProps = {},
  renderers = {},
  rendererProps = defaultProps,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [nonFieldErrors, setNonFieldErrors] = useState("");
  const methods = useForm(rhfProps);


  const onSubmit = (body) => {
    setSubmitting(true);
    submit({
      setError: methods.setError,
      data: body,
      setServerError: setNonFieldErrors,
      setSubmittingState: setSubmitting,
    });
  };
  const Wrapper = formWrapper ? formWrapper : React.Fragment;
  console.log("fields", fields);
  return (
    <FormProvider {...methods}>
      <FormRendererContext.Provider value={{ renderers, overrides, rendererProps: { ...defaultProps, ...rendererProps } }}>
        <Form id={formId} onSubmit={methods.handleSubmit(onSubmit)}>
          <Wrapper>
            <FormFieldsRenderer
              fields={fields}
              overrides={overrides}
              renderers={renderers}
            />
            {nonFieldErrors.length ? (
              <div className="text-center">
                {nonFieldErrors.map((error, index) => (
                  <StyledError key={index}>{error}</StyledError>
                ))}
              </div>
            ) : null}
          </Wrapper>
          <ButtonsContainer>
            <LoadingButton
              color="primary"
              className={`${buttonProps.className}`}
              type="submit"
              data-test="form-submit"
              value={buttonProps.name}
              loading={submitting}
              disabled={submitting}
              {...buttonProps}
            >
              {buttonProps.name}
            </LoadingButton>
          </ButtonsContainer>
        </Form>
      </FormRendererContext.Provider>
    </FormProvider>
  );
};

FormRenderer.propTypes = {
  /** The fields that will be part of the form */
  fields: PropTypes.array.isRequired,
  /** Any overrides to be passed down to the FormFieldsRenderer styles. */
  overrides: PropTypes.object,
  /** The submit action of the form */
  onSubmit: PropTypes.func.isRequired,
  /** props to initialize `useForm` */
  rhfProps: PropTypes.object,
  /** Additional props for the Submit button */
  buttonProps: PropTypes.object,
  /** Custom Styled Wrapper on the form */
  formWrapper: PropTypes.elementType,
  /** Id of the form (used in conjunction with hasRemoteSubmitBtn) */
  formId: PropTypes.string,
  /** The renderers used for to display the forms */
  renderers: PropTypes.object.isRequired,
  /** extra props for each renderer */
  rendererProps: PropTypes.object,
};

FormRenderer.defaultProps = {
  fields: [],
  overrides: {},
  defaultValues: {},
  buttonProps: { name: "Submit", block: false, className: "" },
  hasRemoteSubmitBtn: false,
};

export default React.memo(FormRenderer);
