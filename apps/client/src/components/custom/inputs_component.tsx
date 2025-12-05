import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface IInputProps {
  label: string;
  type?: string;
  placeholder: string;
}
const Inputs_component: React.FC<IInputProps> = ({
  label,
  type,
  placeholder,
}) => {
  return (
    <div className="grid gap-1">
      <Label>{label}</Label>
      <Input type={type ?? "text"} placeholder={placeholder} required />
    </div>
  );
};

export default Inputs_component;
