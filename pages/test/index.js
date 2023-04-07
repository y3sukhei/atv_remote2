import { useEffect, useState } from "react";

const Test = () => {
  const [devices, setDevices] = useState([]);
  //   useEffect(() => {
  //     setInterval(logJSONData, 5000);
  //   }, []);

  async function logJSONData() {
    const response = await fetch("/api/hello");

    await response.json().then((response) => {
      if (response.length > 0) {
        setDevices(response);
        console.log("devices :", devices);
      }
      console.log(response);
    });
  }

  return (
    <>
      <button
        onClick={() => {
          logJSONData();
        }}>
        FETCH
      </button>

      <a>{devices[0]?.address}</a>

      <div>Enter</div>
    </>
  );
};

export default Test;
