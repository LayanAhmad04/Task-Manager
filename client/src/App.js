import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/api/health");
      setHealth(data);
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Task Manager</h1>
      <pre>{JSON.stringify(health, null, 2)}</pre>
    </div>
  );
}

export default App;
