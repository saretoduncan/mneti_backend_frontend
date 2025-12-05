import { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

interface IPassworInput {
  placeholder?: string;
}
const Password_input_compnent: React.FC<IPassworInput> = ({ placeholder }) => {
  const [isPasswordSeen, setPasswordSeen] = useState(false);
  const handlePasswordSeen = () => setPasswordSeen(!isPasswordSeen);
  return (
    <div className="relative">
      <Input
        placeholder={placeholder ?? "password"}
        type={isPasswordSeen ? "text" : "password"}
        required
      />
      <div
        className="size-fit absolute top-2 right-2 cursor-pointer"
        onClick={handlePasswordSeen}
      >
        {isPasswordSeen ? <EyeOff className="" /> : <Eye />}
      </div>
    </div>
  );
};

export default Password_input_compnent;
