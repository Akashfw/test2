const express= require("express");
const app= express();
app.use(express.text());
const redis= require("redis");
require("dotenv").config();


const client = redis.createClient({
    password: process.env.pass,
    socket: {
      host: "redis-14279.c264.ap-south-1-1.ec2.cloud.redislabs.com",
      port: 14279,
    },
  });

  client.on("error", (err) => console.log(err, "ERROR in REDIS"));
client.connect();


app.post("/message/:key", async (req, res) => {
    const { key } = req.params;
    const payload = req.body;
    const response = await client.EXISTS(key);
    if (response) {
      return res
        .status(404)
        .send("This key Already Present,choose an unique Key");
    }
    if (payload === " ") {
      return res
      .status(404).send("Enter a Message");
    }
    await client.SET(key, payload);
    await client.EXPIRE(key, 60);
    const ttl= await client.TTL(key);
    res.send("Success! " + `${key} : ${payload} will expire in ${ttl} seconds`);
  });
  
  app.listen(process.env.port, () => {
      console.log("Listening at  "+`${process.env.port}`);
    });

