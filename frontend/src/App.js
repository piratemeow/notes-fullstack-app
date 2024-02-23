import logo from "./logo.svg";
import "./App.css";

import Box from "./Box";
import { useState, useEffect } from "react";
import api from "./api";

function App() {
  const [comparray, setComparray] = useState([]);
  useEffect(() => {
    const func = async () => {
      try {
        const message = await api.get("/message");
        console.log(message.data);
        const components = message.data.map((item, index) => (
          <Box title={item.title} description={item.description} key={index} />
        ));
        setComparray(components);
      } catch (error) {
        console.error(error);
      }
    };

    func();
  }, []);

  return (
    <div className="App">
      <Box comparrayr={comparray} setcomparray={setComparray} />
      {/* <Box/> */}
      {comparray}
    </div>
  );
}

export default App;
