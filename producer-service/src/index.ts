import { Hono } from "hono";
import { kafka, startServices } from "./start.services";

const app = new Hono();

startServices();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/produce-messages", async (c) => {
  const { message } = await c.req.json();

  if (!message) {
    return c.json({ message: "Required" });
  }

  try {
    await kafka.produceMessages("test", [{ value: message }]);
    return c.json({ message: "Message sent successfully", success: true }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ error: error }, 500);
  }
});

export default app;
