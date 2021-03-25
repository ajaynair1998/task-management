import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { logger } from "@logging/Logger";

@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
   public error(error: any, req: any, res: any, next: (err?: any) => any): any {
      if (error.type) {
         logger.info(error, error.type);
         return res.status(error.status).send({
            message: error.message,
            error_code: error.error_code,
         });
      }
      if (error) {
         logger.error(error, "unexpected error");
         return res.status(500).send({
            error_code: "SERVER_ERROR",
            message: "Something unexpected happened, we are investigating this issue right now",
         });
      }
   }
}
