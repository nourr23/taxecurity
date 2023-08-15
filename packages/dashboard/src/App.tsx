import "./App.css";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import { router } from "./routes";

function App() {
  return (
    <div className="App text-red-700 font-bold">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
