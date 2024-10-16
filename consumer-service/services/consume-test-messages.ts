import { KafkaConfig } from "../config/kafka.config";

export const consumeTestMessages = async (kafka: KafkaConfig) => {
  try {
    await kafka.consume((message) => {
      console.log("Received message on consumer : ", message);
    });
  } catch (error) {
    console.log("Error in consuming messages : ", error);
  }
};
