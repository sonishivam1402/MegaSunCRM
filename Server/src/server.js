import app from "./app.js";
import { PORT } from './config/env.js';
import { startCronOnServerStart } from "./controllers/cron.controller.js";

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  // Start cron job once server starts
  startCronOnServerStart();
});
