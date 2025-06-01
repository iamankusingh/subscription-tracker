import { useEffect, useState } from "react";
// import Header from "./components/Header";

function App() {
  const [data, setData] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    fetch("http://localhost:5500/")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <>
      <main>
        {/* <Header /> */}
        <h1>Subscription Tracker</h1>
        <div>{data ? <p>{data.message}</p> : <p>Loading...</p>}</div>
      </main>
    </>
  );
}

export default App;
