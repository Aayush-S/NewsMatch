import "./App.css";
import axios from "axios";

import { useState, useEffect } from "react";

function App() {
  const [embeddings, setEmbeddings] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/embeddings").then((response) => {
      console.log("hello");
      const res = response.data;
      console.log(res);
      setEmbeddings(res);
    });
  }, []);

  return (
    <div className="App">
      <p>hello</p>

      {Object.entries(embeddings).map(([key, value]) => (
        <p>
          {key}, {value}
        </p>
      ))}
    </div>
  );
}

export default App;
