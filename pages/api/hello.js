// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import tls from "tls";
import forge from "node-forge";
import crypto from "crypto";
import { AndroidRemote } from "androidtv-remote";
import { Server } from "socket.io";
import readLine from "readline";
// const readLine = require("readline");
const mDnsSd = require("node-dns-sd");
const fs = require("fs");
const path = require("path");

const SocketHandler = (req, res) => {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    if (req.method === "POST") {
        let options = {
            pairing_port: 6467,
            remote_port: 6466,
            name: "androidtv-remote",
            cert: {},
        };
        // let androidRemote2 = new AndroidRemote("192.168.1.37", options);
        const { body } = req;
        console.log("body :", body);
        androidRemote.sendCode(body.secret);
        return res.status(200).json({ name: "paired" });
    } else {
        const { deviceId } = req.query;
        console.log("device id :", deviceId);
        let options = {
            pairing_port: 6467,
            remote_port: 6466,
            name: "androidtv-remote",
            cert: {},
        };
        let androidRemote = new AndroidRemote(deviceId, options);
        // start pairing request
        androidRemote.start();
        // rl.question("Code : ", (code) => {
        //     console.log(" asas" + code);
        //     androidRemote.sendCode(code);
        // });
        androidRemote.on("secret", () => {
            rl.question("Code : ", (code) => {
                console.log(" " + code);
                androidRemote.sendCode(code);
            });
        });

        // return res.status(200).json({ name: "connected" });
    }
    // send code when ask to pair
    // androidRemote.sendCode();
    // let options = {
    //     key:
    //         // generateFull("yesukhei", "Mongolia", "Ulaanbaatar", "Mongolia", "Univision", "idk").key,
    //         fs.readFileSync(path.resolve("./pages/cert/key.pem")),
    //     cert:
    //         //generateFull("yesukhei", "Mongolia", "Ulaanbaatar", "Mongolia", "Univision", "idk").cert,
    //         fs.readFileSync(path.resolve("./pages/cert/cert.pem")),
    //     port: 6467,
    //     host: deviceId,
    //     rejectUnauthorized: false,
    // };
    // const client = tls.connect(options, () => {
    //     console.debug(options.host + " Pairing connected");
    // });
    // client.on("secureConnect", () => {
    //     console.debug(options.host + " Pairing secure connected");
    //     // pass pairing message
    //     client.write("hello");
    // });
    // client.on("data", (data) => {
    //     console.log("Received data :", data);
    // });
    // async function discover() {
    //     await mDnsSd
    //         .discover({
    //             name: "_androidtvremote2._tcp.local.",
    //             quick: true,
    //         })
    //         .then((device_list) => {
    //             console.log("device list ", JSON.stringify(device_list, null, "  "));
    //             if (device_list.length > 0) {
    //                 console.log("device found ", JSON.stringify(device_list, null, "  "));
    //                 res.status(200).json(JSON.stringify(device_list, null, "  "));
    //                 // return JSON.stringify(device_list, null, "  ");
    //                 let options = {
    //                     key: generateFull(
    //                         "yesukhei",
    //                         "Mongolia",
    //                         "Ulaanbaatar",
    //                         "Mongolia",
    //                         "Univision",
    //                         "idk"
    //                     ).key,
    //                     //fs.readFileSync(path.resolve(__dirname,'../../cert/key.pem'))
    //                     cert: generateFull(
    //                         "yesukhei",
    //                         "Mongolia",
    //                         "Ulaanbaatar",
    //                         "Mongolia",
    //                         "Univision",
    //                         "idk"
    //                     ).cert,
    //                     //fs.readFileSync(path.resolve(__dirname,'../../cert/cert.pem'))
    //                     port: 6467,
    //                     host: "192.168.10.175",
    //                     rejectUnauthorized: false,
    //                 };
    //                 tls.connect(options, () => {
    //                     console.debug("Pairing connected");
    //                 });
    //             } else {
    //                 res.status(201).json({ status: "try again" });
    //                 // discover();
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }
    // discover().then((result) => {
    //   if (result) {
    //     console.log("result :", result);
    //     res.status(200).json(result);
    //     resolve();
    //   } else {
    //     discover();
    //     console.log("error");
    //   }
    // });
    //setInterval(discover, 5000);
};
export default SocketHandler;
