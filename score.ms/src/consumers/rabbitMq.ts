import amqp from 'amqplib';

export enum RabbitMqQueue {
  SCORE_SUBMISSIONS = 'score-queue',
}

export async function createRabbitMqChannel(rabbitMqUri: string) {
  if (!rabbitMqUri) {
    throw new Error('RABBITMQ_URI environment variable is not set');
  }
  try {
    const rabbitMqConnection = await amqp.connect(rabbitMqUri)
    const rabbitMqChannel = await rabbitMqConnection.createChannel();
    return rabbitMqChannel;
  } catch (error) {
    throw new Error('Failed to connect to RabbitMQ');
  }
}