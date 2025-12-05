import { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import Input_error_component from "./input_error_component";

interface IPassworInput {
  placeholder?: string;
  err?: string;
}
const Password_input_compnent: React.FC<IPassworInput> = ({
  placeholder,
  err,
  ...props
}) => {
  const [isPasswordSeen, setPasswordSeen] = useState(false);
  const handlePasswordSeen = () => setPasswordSeen(!isPasswordSeen);
  return (
    <div className="relative">
      <Input 
        placeholder={placeholder ?? "password"}
        type={isPasswordSeen ? "text" : "password"}
        required
        {...props}
      />
      {err && <Input_error_component message={err} />}

      <div
        className="size-fit absolute top-2 right-2 cursor-pointer"
        onClick={handlePasswordSeen}
      >
        {isPasswordSeen ? <EyeOff  /> : <Eye />}
      </div>
    </div>
  );
};

export default Password_input_compnent;
