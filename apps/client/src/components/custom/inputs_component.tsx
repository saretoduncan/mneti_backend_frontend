import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Input_error_component from "./input_error_component";

interface IInputProps {
  label: string;
  type?: string;
  placeholder: string;
  err?: string;
}
const Inputs_component: React.FC<IInputProps> = ({
  label,
  type,
  placeholder,
  err,
  ...props
}) => {
  return (
    <div className="grid gap-1">
      <Label>{label}</Label>
      <Input
        type={type ?? "text"}
        placeholder={placeholder}
        required
        {...props}
      />
      {err && <Input_error_component message={err} />}
    </div>
  );
};

export default Inputs_component;
