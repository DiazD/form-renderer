import { Form } from "semantic-ui-react";

const FormElementRenderer = ({ children, ...props }) => {
  return <Form {...props}>{children}</Form>
};

export default FormElementRenderer;
