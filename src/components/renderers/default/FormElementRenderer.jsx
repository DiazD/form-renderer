const FormElementRenderer = ({ children, ...props }) => {
  return <form {...props}>{children}</form>
};

export default FormElementRenderer;
