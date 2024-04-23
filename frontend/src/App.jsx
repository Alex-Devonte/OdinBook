import "./App.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/Home.jsx";
import Header from "./components/Header.jsx";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      {user && (
        <>
          <Header />
          <div id="content-container">
            <Home />
          </div>
        </>
      )}
    </>
  );
}

export default App;
