import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styles from "./index.module.css";

let socket;
const Test = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");
    const [inputValue, setInputValue] = useState("192.168.10.175");
    const [secretValue, setSecretValue] = useState("");
    const [message, setMessage] = useState([]);

    useEffect(() => {
        socket = io("http://localhost:8080");

        // socket.connect("http://127.0.0.1:8080/pair");
        socket.on("connect", () => {
            console.log("Successfully connected");
        });

        // socketInitializer();
    }, []);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSecretChange = (event) => {
        setSecretValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // pair device
        pairDevice();

        // Handle form submission here
        console.log("Submitted value:", inputValue);
    };

    const handleSecretSubmit = (event) => {
        event.preventDefault();

        // pair device
        pairSecretValue();

        // Handle form submission here
        console.log("Submitted value:", inputValue);
    };

    async function pairSecretValue() {
        socket.emit("secret", secretValue);
    }

    const sendMessage = (command) => {
        // Here, you can implement the logic to send the command to the TV
        console.log(`Sending command: ${command}`);
        setMessage(`Sending command: ${command}`);
    };

    async function pairDevice() {
        socket.emit("device id", inputValue);
    }

    const handleKeyPress = (event) => {
        switch (event) {
            case "up":
                console.log("up");
                socket.emit("key event", "up");
                break;
            case "down":
                console.log("down");
                socket.emit("key event", "down");
                break;
            case "left":
                console.log("left");
                socket.emit("key event", "left");
                break;
            case "right":
                console.log("right");
                socket.emit("key event", "right");
                break;
            case "ok":
                console.log("enter");
                socket.emit("key event", "ok");
                break;
            case "back":
                console.log("back");
                socket.emit("key event", "back");
                break;
            default:
                console.log(
                    "You need to add some cases here, a key you pressed was",
                    event.keyCode
                );
        }
    };

    return (
        <>
            {/* <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter IP"
                    value={inputValue}
                    onChange={handleChange}
                />
                <button type="submit">Pair</button>
            </form>

            <form onSubmit={handleSecretSubmit}>
                <input
                    type="text"
                    placeholder="Enter Pairing Code"
                    value={secretValue}
                    onChange={handleSecretChange}
                />
                <button type="submit">Enter</button>
            </form> */}

            <main>
                <div class="phone">
                    {/* <div class="list topbar d-flex justify-content-between">
                        <div>9:41 AM</div>
                        <div class="status-bar d-flex">
                            <img
                                src="https://www.yudiz.com/codepen/smart-remote-control/mobile-signal.svg"
                                alt="signal"
                            />
                            <img
                                src="https://www.yudiz.com/codepen/smart-remote-control/wifi.svg"
                                alt="wifi"
                            />
                            <img
                                src="https://www.yudiz.com/codepen/smart-remote-control/battery.svg"
                                alt="battery"
                            />
                        </div>
                    </div> */}
                    <div class="list d-flex justify-content-between">
                        <button class="btn btn-shadow btn-small" style={{ color: "#3271a8" }}>
                            TV
                        </button>

                        <button class="btn btn-shadow">
                            <img
                                src="https://www.yudiz.com/codepen/smart-remote-control/microphone.svg"
                                alt="microphone"
                            />
                        </button>
                        <button class="btn btn-shadow btn-small no-mode">
                            <img
                                src="https://www.yudiz.com/codepen/smart-remote-control/power.svg"
                                alt="undo"
                            />
                        </button>
                    </div>
                    <div class="list d-flex justify-content-between">
                        <button class="btn  btn-shadow btn-small" style={{ color: "#3271a8" }}>
                            Vol -
                        </button>

                        <button class="btn btn-shadow">
                            <img src="/login.svg" alt="microphone" />
                        </button>
                        <button class="btn btn-shadow btn-small" style={{ color: "#3271a8" }}>
                            Vol +
                        </button>
                    </div>
                    <div class="list d-flex justify-content-between">
                        <button class="btn">
                            <img
                                src="https://www.yudiz.com/codepen/smart-remote-control/backward.svg"
                                alt="undo"
                            />
                        </button>
                        <button class="btn">
                            <img src="/play_pause.svg" alt="undo" />
                        </button>
                        <button class="btn">
                            <img
                                src="https://www.yudiz.com/codepen/smart-remote-control/forward.svg"
                                alt="undo"
                            />
                        </button>
                    </div>
                    <div class="list d-flex justify-content-between">
                        <button class="btn">
                            <img src="/movie.svg" alt="undo" />
                        </button>
                        <button class="btn">
                            Apps
                            {/* <img
                                src="https://www.yudiz.com/codepen/smart-remote-control/pause.svg"
                                alt="undo"
                            /> */}
                        </button>
                        <button class="btn">
                            TV
                            {/* <img
                                src="https://www.yudiz.com/codepen/smart-remote-control/forward.svg"
                                alt="undo"
                            /> */}
                        </button>
                    </div>
                    {/* Main Navigation */}
                    <div class="list d-flex justify-content-between">
                        <div class="side-btns">
                            <div class="d-flex inner justify-content-between align-items-center">
                                <button class="btn">
                                    <img
                                        src="https://www.yudiz.com/codepen/smart-remote-control/add.svg"
                                        alt="add"
                                    />
                                </button>
                                <div>Vol</div>
                                <button class="btn">
                                    <img
                                        src="https://www.yudiz.com/codepen/smart-remote-control/minus.svg"
                                        alt="minus"
                                    />
                                </button>
                            </div>
                        </div>
                        <div class="center-btns">
                            <button class="btn btn-up" onclick="handleKeyPress('up')">
                                <img
                                    src="https://www.yudiz.com/codepen/smart-remote-control/arrow-up.svg"
                                    alt="arrow"
                                />
                            </button>
                            <button class="btn btn-right" onclick="handleKeyPress('right')">
                                <img
                                    src="https://www.yudiz.com/codepen/smart-remote-control/arrow-right.svg"
                                    alt="arrow"
                                />
                            </button>
                            <button class="btn btn-ok" onclick="handleKeyPress('ok')">
                                OK
                            </button>
                            <button class="btn btn-down" onclick="handleKeyPress('down')">
                                <img
                                    src="https://www.yudiz.com/codepen/smart-remote-control/arrow-down.svg"
                                    alt="arrow"
                                />
                            </button>
                            <button class="btn btn-left" onclick="handleKeyPress('left')">
                                <img
                                    src="https://www.yudiz.com/codepen/smart-remote-control/arrow-left.svg"
                                    alt="arrow"
                                />
                            </button>
                        </div>
                        <div class="side-btns">
                            <div class="d-flex inner justify-content-between align-items-center">
                                <button class="btn">
                                    <img
                                        src="https://www.yudiz.com/codepen/smart-remote-control/arrow-up.svg"
                                        alt="arrow"
                                    />
                                </button>
                                <div>ch</div>
                                <button class="btn">
                                    <img
                                        src="https://www.yudiz.com/codepen/smart-remote-control/arrow-down.svg"
                                        alt="arrow"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="list d-flex justify-content-between">
                        <button class="btn">
                            <img
                                src="https://www.yudiz.com/codepen/smart-remote-control/undo.svg"
                                alt="undo"
                            />
                        </button>

                        <button class="btn">
                            <img
                                src="https://www.yudiz.com/codepen/smart-remote-control/volume-cross.svg"
                                alt="undo"
                            />
                        </button>
                        <button class="btn">
                            <img
                                src="https://www.yudiz.com/codepen/smart-remote-control/home.svg"
                                alt="home"
                            />
                        </button>
                        <button class="btn">
                            <img src="/search.svg" alt="undo" />
                        </button>
                    </div>

                    <div class="list d-flex justify-content-between">
                        <button class="btn">1</button>
                        <button class="btn">2</button>
                        <button class="btn">3</button>
                    </div>
                    <div class="list d-flex justify-content-between">
                        <button class="btn">4</button>
                        <button class="btn">5</button>
                        <button class="btn">6</button>
                    </div>
                    <div class="list d-flex justify-content-between">
                        <button class="btn">7</button>
                        <button class="btn">8</button>
                        <button class="btn">9</button>
                    </div>
                    <div class="list d-flex justify-content-between">
                        <button class="btn">
                            <img src="/clear.svg" alt="clear" />
                        </button>
                        <button class="btn">0</button>
                        <button class="btn" style={{ color: "#3bd433" }}>
                            -
                        </button>
                    </div>
                    <div class="bottom-menu d-flex">
                        {/* <button class="btn"> */}
                        <img width={"80px"} src="/Univision_bosoo.png" alt="univision" />
                        {/* </button> */}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Test;
