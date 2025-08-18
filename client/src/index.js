import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

const App = () => {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    // Call backend API
    axios.get("/api/health")
      .then(res => setStatus("Backend says: " + res.data.ok))
      .catch(err => setStatus("Error connecting to backend"));
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <p>{status}</p>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
