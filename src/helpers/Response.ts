import { Response } from 'express';
import { HttpCode, statusCode } from '../types/enums';

class Res {
  static Success(res: Response, data): any {
    return res.status(HttpCode.OK).json({
      status: statusCode.SUCCESS,
      code: HttpCode.OK,
      data,
    });
  }

  static Created(res: Response, data: any): any {
    return res.status(HttpCode.CREATED).json({
      status: statusCode.SUCCESS,
      code: HttpCode.CREATED,
      data,
    });
  }

  static BadRequest(res: Response, message = 'Bad Requset'): any {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: statusCode.ERROR,
      code: HttpCode.BAD_REQUEST,
      message,
    });
  }

  static Unauthorized(res: Response, message = 'Unauthorized'): any {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: statusCode.ERROR,
      code: HttpCode.UNAUTHORIZED,
      message,
    });
  }

  static Forbidden(res: Response): any {
    return res.status(HttpCode.FORBIDDEN).json({
      status: statusCode.ERROR,
      code: HttpCode.BAD_REQUEST,
      message: 'Bad Requset',
    });
  }

  static Conflict(res: Response, message: string): any {
    return res.status(HttpCode.CONFLICT).json({
      status: statusCode.ERROR,
      code: HttpCode.CONFLICT,
      message,
    });
  }

  static InternalError(res: Response, message = 'Shit Happens'): any {
    return res.status(HttpCode.CONFLICT).json({
      status: statusCode.ERROR,
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message,
    });
  }
}

export default Res;
