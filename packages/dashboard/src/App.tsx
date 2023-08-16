import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import APIProvider from "./services/global/APIProvider";

function App() {
  return (
    <APIProvider>
      <RouterProvider router={router} />
    </APIProvider>
  );
}

export default App;
