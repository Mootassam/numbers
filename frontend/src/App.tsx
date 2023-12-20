import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./view/shared/routes/RoutesComponent";

function App() {
  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
}

export default App;
