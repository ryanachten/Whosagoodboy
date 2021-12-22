import React, { useEffect } from "react";
import "./App.css";
import ClassificationService from "./services/ClassificationService";

function App() {
  useEffect(() => {
    const classificationService = new ClassificationService();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src="test-images/Pug.jpg" alt="" />
      </header>
    </div>
  );
}

export default App;
