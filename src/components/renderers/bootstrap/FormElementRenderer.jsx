import { Form } from "reactstrap";

const FormElementRenderer = ({ children, ...props }) => {
  return <Form {...props}>{children}</Form>
};

export default FormElementRenderer;
