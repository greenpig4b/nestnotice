import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Method: ${req.method}, URL: ${req.url}, REQUEST: ${req}, RESPONSE: ${res}`,
    );
    next();
  }
}
