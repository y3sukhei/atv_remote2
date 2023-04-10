import { useEffect, useState } from "react";

const Test = () => {
  const [devices, setDevices] = useState("");
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    // logJSONData();
  }, []);

  async function logJSONData() {
    const response = await fetch("/api/hello");
    await response?.json().then((response) => {
      if (response.status) {
        setText(response.status);
      }
      if (response.length > 0) {
        setDevices(response[0].address);
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
          setText("");
          setDevices("");
          // console.log("devices :", devices);
          logJSONData();
        }}>
        FETCH
      </button>
      {devices}
      {text}
      <div>Enter</div>
    </>
  );
};

export default Test;
