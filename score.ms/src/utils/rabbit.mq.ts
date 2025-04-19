import amqplib, { Channel } from "amqplib";
import { Logger } from "winston";

export enum RabbitMqQueue {
  SCORE_SUBMISSIONS = 'score-queue',
}


export async function connectToRabbitMq(url: string) {
  const connection = await amqplib.connect(url);
  const rabbitChannel = await connection.createChannel();
  console.log("RabbitMQ connected");
  return rabbitChannel;
}

export async function assertAllQueues(channel: Channel) {
  Object.values(RabbitMqQueue).map((queue) => {
    channel.assertQueue(queue);
    console.log(`Queue ${queue} asserted`);
  });
}

export class RabbitMqManager {
  constructor(private channel: Channel, private logger: Logger) {}

  public sendMessage(queue: string, message: string) {
    this.logger.info("message add to queue", {
      queue,
      message,
    });
    this.channel.assertQueue(queue)
    this.channel.sendToQueue(queue, Buffer.from(message));
  }
}
