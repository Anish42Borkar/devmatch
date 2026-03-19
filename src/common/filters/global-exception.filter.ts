import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch() // catch ALL errors
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object | null = 'Something went wrong';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else if (exception instanceof Error) {
      message = exception.message; // ✅ IMPORTANT
    } else if (typeof exception === 'object') {
      message = exception; // 👈 your { err: 'error' } will come here
    } else {
      message = exception as string;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
    });
  }
}
