import { useEffect, useState } from "react";

const Test = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // logJSONData();
  }, []);

  async function logJSONData() {
    const response = await fetch("/api/hello");
    await response?.json().then((response) => {
      if (response.length > 0) {
        setDevices(response);
        setLoading(false);
        console.log("devices :", devices);
      }
      console.log(response);
    });
  }

  return (
    <>
      <button
        onClick={() => {
          // console.log("devices :", devices);
          logJSONData();
        }}>
        FETCH
      </button>
      {devices.length > 0 ? devices[0].address : <div>Loading...</div>}

      <div>Enter</div>
    </>
  );
};

export default Test;
