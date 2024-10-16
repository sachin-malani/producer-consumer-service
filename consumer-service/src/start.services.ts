import { KafkaConfig } from "../config/kafka.config"
import { consumeTestMessages } from "../services/consume-test-messages";

export const startServices = async () => {
    try {
        const kafka = new KafkaConfig(["localhost:9092"]);
        await kafka.connect();
        await kafka.subscribe("test");
        await consumeTestMessages(kafka);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
