// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import tls from "tls";
import forge from "node-forge";
import crypto from "crypto";
const mDnsSd = require("node-dns-sd");

export default function (req, res) {
  const generateFull = (name, country, state, locality, organization, OU) => {
    let keys = forge.pki.rsa.generateKeyPair(2048);
    let cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;
    cert.serialNumber = "01" + crypto.randomBytes(19).toString("hex");
    cert.validity.notBefore = new Date();
    let date = new Date();
    date.setUTCFullYear(2099);
    cert.validity.notAfter = date;
    let attributes = [
      { name: "commonName", value: name },
      { name: "countryName", value: country },
      { shortName: "ST", value: state },
      { name: "localityName", value: locality },
      { name: "organizationName", value: organization },
      { shortName: "OU", value: OU },
    ];
    cert.setSubject(attributes);
    cert.sign(keys.privateKey, forge.md.sha256.create());

    return {
      cert: forge.pki.certificateToPem(cert),
      key: forge.pki.privateKeyToPem(keys.privateKey),
    };
  };
  //while (deviceList.length > 0) {
  console.log("discover listening ");

  return new Promise((resolve, reject) => {
    discover();
    async function discover() {
      await mDnsSd
        .discover({
          name: "_services._dns-sd._udp.local",
          quick: true,
        })
        .then((device_list) => {
          console.log("device list ", JSON.stringify(device_list, null, "  "));

          if (device_list.length > 0) {
            console.log("device found ", JSON.stringify(device_list, null, "  "));

            res.status(200).json(JSON.stringify(device_list, null, "  "));

            resolve();
            // return JSON.stringify(device_list, null, "  ");
            // let options = {
            //   key: generateFull("yesukhei", "Mongolia", "Ulaanbaatar", "Mongolia", "Univision", "idk").key,

            //   //fs.readFileSync(path.resolve(__dirname,'../../cert/key.pem'))
            //   cert: generateFull("yesukhei", "Mongolia", "Ulaanbaatar", "Mongolia", "Univision", "idk").cert,
            //   //fs.readFileSync(path.resolve(__dirname,'../../cert/cert.pem'))
            //   port: 6467,
            //   host: "192.168.10.175",
            //   rejectUnauthorized: false,
            // };

            // tls.connect(options, () => {
            //   console.debug("Pairing connected");
            // });
          } else {
            res.status(201).json({ status: "try again" });
            // discover();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
  });

  //setInterval(discover, 5000);

  // return res.status(200).json({ name: "hello" });
}
