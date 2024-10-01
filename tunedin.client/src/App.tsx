import { useRoutes } from "react-router-dom";
import "./App.css";
import { routes } from "./Router/routes";
import Navbar from "./Components/GeneralComponents/Navbar/Navbar";
import Footer from "./Components/GeneralComponents/Footer/Footer";

function App() {
  const element = useRoutes(routes);

  return (
    <div>
      <Navbar />
      <div className="min-h-[100vh]">{element}</div>
      <Footer />
    </div>
  );
}

export default App;
