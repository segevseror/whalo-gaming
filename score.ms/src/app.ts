import express from "express";
import { routes } from "./api/routes";
import connectDB from "./models/db/mongo.db";
// import { rabbitMQ } from "./lib/helper/rabbit";
import { startScoreConsumer } from "./consumers/score-consumer";
import { initializeRedis } from "./models/db/redis.db";
// import HandleTopScoreList from "./lib/helper/manager-top-score-list";
// import ScoreConsumer from "./consumers/score-consumer";
import { createRabbitMqChannel } from "./consumers/rabbitMq";
import { rabbitMQ } from "./lib/helper/rabbit";

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());

// Routes
app.use("/api/", routes);
initializeRedis();
connectDB();
(async () => {
  await rabbitMQ.connect("amqp://admin:password@localhost"); // Change if needed
  await startScoreConsumer();
})();

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Microservice Management is running on port ${PORT}`);
});

export default app;
