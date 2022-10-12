import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    InternalServerErrorException
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: InternalServerErrorException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        /**
         * @description Exception json response
         * @param message
         */
        const responseMessage = (type: string, message: string) => {
            console.log(response);
            response?.status(status)?.json({
                statusCode: status,
                path: request.url,
                errorType: type,
                errorMessage: message
            });
        };

        if (exception.message) {
            responseMessage('Error', exception.message);
        } else {
            responseMessage(exception.name, exception.message);
        }
    }
}
