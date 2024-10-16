import { Consumer, Kafka, Message } from "kafkajs";

export class KafkaConfig {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor(brokers: string[]) {
    this.kafka = new Kafka({
      clientId: "consumer-service",
      brokers: brokers,
    });

    this.consumer = this.kafka.consumer({
        groupId: "test-group"
    });
  }

  async connect() {
    try {
      await this.consumer.connect();
    } catch (error) {
      throw new Error(
        "Something went wrong while connecting kafka: " + `${error}`
      );
    }
  }

  async subscribe(topic: string) {
    try {
      await this.consumer.subscribe({
        topic,
        fromBeginning: true,
      });
      console.log("Subsciber Topic : ", topic);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async consume(onMessage: (message: string) => void) {
    try {
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          message?.value && onMessage(message?.value?.toString());
        },
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async disconnect() {
    try {
      await this.consumer.disconnect();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
