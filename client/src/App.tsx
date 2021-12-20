import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ClassificationService from "./services/ClassificationService";

function App() {
  useEffect(() => {
    const classificationService = new ClassificationService();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src="test-images/German-Shepherd.jpg" alt="" />
      </header>
    </div>
  );
}

export default App;
