// src/lib/rabbitmq.ts
import amqplib, { Channel } from "amqplib";

class RabbitMQ {
  private connection: any = null;
  private channel: Channel | null = null;

  async connect(url: string) {
    this.connection = await amqplib.connect(url);
    this.channel = await this.connection.createChannel();
    console.log("RabbitMQ connected");
  }

  async sendToQueue(queue: string, message: string) {
    if (!this.channel) throw new Error("Channel not initialized");
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async consume(queue: string, callback: (msg: any) => void) {
    if (!this.channel) throw new Error("Channel not initialized");
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (msg) => {
      if (msg) {
        callback(msg);
        this.channel!.ack(msg);
      }
    });
  }

  getChannel() {
    return this.channel;
  }

  async close() {
    await this.channel?.close();
  }
}

export const rabbitMQ = new RabbitMQ();
