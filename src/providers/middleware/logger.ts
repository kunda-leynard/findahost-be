import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
const chalk = require("chalk");

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const { method, baseUrl: url } = request;

    response.on("finish", () => {
      const { statusCode } = response;
      const diff = process.hrtime(startAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;

      let codeColor;
      if (statusCode < 199) {
        codeColor = "white";
      } else if (statusCode < 299) {
        codeColor = "green";
      } else if (statusCode < 399) {
        codeColor = "orange";
      } else if (statusCode < 499) {
        codeColor = "red";
      } else if (statusCode < 599) {
        codeColor = "yellow";
      }

      this.logger.log(
        `${chalk.yellow(method.toLocaleUpperCase())} ${chalk.green(
          url
        )} ${chalk[codeColor](statusCode)} ${chalk.white(
          Math.ceil(responseTime)
        )}ms`
      );
    });

    next();
  }
}
