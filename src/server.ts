import { app } from "./app";
import { env } from "./env";

app
  .listen({
    port: env.PORT || 4000,
  })
  .then(() => console.log("http server running at port: " + env.PORT));
