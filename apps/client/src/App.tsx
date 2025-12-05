import { Toaster } from "sonner";
import PublicRouters from "./routers/publicRouters";

function App() {
  return (
    <div className="min-h-screen grid">
      <PublicRouters />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
