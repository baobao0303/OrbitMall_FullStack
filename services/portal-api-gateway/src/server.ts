import express, { Application, NextFunction, Request, Response } from 'express';
import setupSwagger from './globals/config/swagger';
import appRoutes from './globals/routes/appRoutes';
import setupMongoDB from './globals/config/database';
import { CustomError, NotFoundException } from './globals/cores/error.core';
import HttpConstants from './globals/constants/http.constants';
import cors from 'cors';

export class Server {
  private _app: Application;
  private _port: number = Number(process.env.PORT) || 5050;

  constructor() {
    this._app = express();
    this._app.use(
      cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
      })
    );
  }

  public async startServer(): Promise<void> {
    await setupMongoDB();
    this._setupMiddleware();
    this._setupRoutes();
    this._setupGlobalErrorHandler();
    this._listenStart();
  }

  private _setupMiddleware(): void {
    // CONFIG JSON AND URL ENCODED
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
  }
  private _setupRoutes(): void {
    // Swagger docs
    setupSwagger(this._app);
    appRoutes(this._app);
  }
  private _setupGlobalErrorHandler(): void {
    // all = [get, post, put, delete, patch]
    this._app.all('*', (req, res, next) => {
      next(new NotFoundException(`The URL ${req.originalUrl} is not found with this method ${req.method}`));
    });

    // Global error handler for all errors: res, req, next
    this._app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message
        });
      }
      return res.status(HttpConstants.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error'
      });
    });
  }

  private _listenStart(): void {
    const port = this._port;

    this._app.listen(port, () => {
      console.log(`Server is running on port ${port} `);
      console.log(`URL: http://localhost:${port}/api/v1`);
      console.log(`Swagger: http://localhost:${port}/swagger`);
    });
  }
}
