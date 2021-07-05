import { useFormContext } from "react-hook-form";
import { Input } from "semantic-ui-react";

const Input_ = ({ field, ...inputProps }) => {
  const { register } = useFormContext();
  const props = { ...inputProps, ...field.inputProps };

  return (
    <Input
      {...props}
      {...register(field.name, field.rules)}
    />
  )
}

export default Input_;
