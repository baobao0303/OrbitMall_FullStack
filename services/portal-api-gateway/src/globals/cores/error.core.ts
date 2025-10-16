import HttpConstants from '../constants/http.constants';

abstract class CustomError extends Error {
  abstract status: string;
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
  }
}

class BadRequestException extends CustomError {
  status: string = 'error';
  statusCode = HttpConstants.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }
}

class NotFoundException extends CustomError {
  status: string = 'error';
  statusCode = HttpConstants.NOT_FOUND;

  constructor(message: string) {
    super(message);
  }
}

class UnauthorizedException extends CustomError {
  status: string = 'error';
  statusCode = HttpConstants.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
  }
}

class ForbiddenException extends CustomError {
  status: string = 'error';
  statusCode = HttpConstants.FORBIDDEN;

  constructor(message: string) {
    super(message);
  }
}

class InternalServerErrorException extends CustomError {
  status: string = 'error';
  statusCode = HttpConstants.INTERNAL_SERVER_ERROR;

  constructor(message: string) {
    super(message);
  }
}

export {
  CustomError,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException
};
