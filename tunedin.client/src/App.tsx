import { useNavigate, useRoutes } from "react-router-dom";
import "./App.css";
import { routes } from "./Router/routes";
import Navbar from "./Components/GeneralComponents/Navbar/Navbar";
import Footer from "./Components/GeneralComponents/Footer/Footer";
import { useEffect } from "react";
import { initializeNavigation } from "./Utils/functions";

function App() {
  const element = useRoutes(routes);
  const navigate = useNavigate();

  useEffect(() => {
    initializeNavigation(navigate);
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="min-h-[100vh]">{element}</div>
      <Footer />
    </div>
  );
}

export default App;
