import { web } from "./app/web.js";
import { logger } from "./app/logging.js";

web.listen(process.env.APP_PORT, () => {
  logger.info(`APP Start Port ${process.env.APP_PORT}`);
});
