import express from "express";
import { createClient } from "redis";

const app = express();

app.get("/", async (_, res) => {
  const redisClient = await createClient({
    url: "redis://redis-server:6379",
  })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

  const peopleVisited = await redisClient.get("value");
  let newValue: number;

  newValue = Boolean(peopleVisited) ? Number(peopleVisited) : 0;

  const displayString = `Page visited ${newValue} times`;

  await redisClient.set("value", newValue + 1);

  res.send(displayString);
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
