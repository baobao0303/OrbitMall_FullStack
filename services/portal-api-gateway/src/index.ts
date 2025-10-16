import dotenv from 'dotenv';
import { Server } from './server';

// Load environment variables
dotenv.config();

export class EcommerceApplication {
  public run(): void {
    const server = new Server();

    server.startServer();
  }
}

const ecommerceApplication: EcommerceApplication = new EcommerceApplication();
ecommerceApplication.run();
