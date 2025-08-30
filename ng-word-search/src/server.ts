import express, { Application } from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import { viewRoutes, apiRoutes } from './feature/auth/routes';

class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 5050;
  }

  // SETUP
  public start(): void {
    this._setupViewEngine();
    this._setupMiddlewares();
    this._setupRouter();
    this._setupGlobalErrorHandler();
    this._listenServer();
  }

  // VIEW ENGINE SETUP
  private _setupViewEngine(): void {
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, 'views'));

    // Setup EJS layouts
    this.app.use(expressLayouts);
    this.app.set('layout', 'layouts/main'); // Layout mặc định
    this.app.set('layout extractScripts', true);
    this.app.set('layout extractStyles', true);
  }

  // MIDDLEWARES
  private _setupMiddlewares(): void {
    // Parse JSON bodies
    this.app.use(express.json());

    // Parse URL-encoded bodies
    this.app.use(express.urlencoded({ extended: true }));

    // Serve Tailwind CSS from node_modules
    this.app.use('/css', express.static(path.join(__dirname, '../node_modules/tailwindcss/dist')));

    console.log('📁 Tailwind CSS path:', path.join(__dirname, '../node_modules/tailwindcss/dist'));
  }

  // ROUTER
  private _setupRouter(): void {
    // View Routes - Authentication
    this.app.use('/', viewRoutes);

    // API Routes - Authentication
    this.app.use('/auth', apiRoutes);

    // Home route
    this.app.get('/', (req, res) => {
      res.send(`
        <h1>NG Word Search Server</h1>
        <p>Server is running successfully!</p>
        <h3>🎨 View Routes (Giao diện):</h3>
        <ul>
          <li><a href="/login">Login</a> (trực tiếp)</li>
          <li><a href="/register">Register</a> (trực tiếp)</li>
          <li><a href="/forgot-password">Forgot Password</a> (trực tiếp)</li>
        </ul>
        <h3>🔌 API Endpoints (JSON):</h3>
        <ul>
          <li><strong>POST</strong> /auth/api/login - Login API</li>
          <li><strong>POST</strong> /auth/api/register - Register API</li>
          <li><strong>POST</strong> /auth/api/forgot-password - Forgot Password API</li>
          <li><strong>GET</strong> /auth/api/logout - Logout API</li>
        </ul>
        <h3>📁 Views Directory:</h3>
        <p>${path.join(__dirname, 'views')}</p>
        <h3>📦 Bootstrap from node_modules:</h3>
        <p>CSS: /css/bootstrap.min.css</p>
        <p>JS: /js/bootstrap.bundle.min.js</p>
      `);
    });

    // Dashboard route (temporary)
    this.app.get('/dashboard', (req, res) => {
      res.render('dashboard', {
        title: 'Dashboard',
        layout: 'layouts/admin' // Sử dụng admin layout
      });
    });
  }

  // GLOBAL ERROR HANDLER
  private _setupGlobalErrorHandler(): void {
    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('🚨 Global error:', err);
      console.error('📍 Request URL:', req.url);

      res.status(500).send(`
        <h1>Error 500</h1>
        <p>Something went wrong!</p>
        <p><strong>Error:</strong> ${err.message}</p>
        <p><a href="/">Go back to home</a></p>
      `);
    });
  }

  // LISTEN SERVER
  private _listenServer() {
    this.app.listen(this.port, () => {
      console.log('🚀 NG Word Search Server Started!');
      console.log('=====================================');
      console.log(`📍 Server running on: http://localhost:${this.port}`);
      console.log(`📁 Views directory: ${path.join(__dirname, 'views')}`);
      console.log('=====================================');
      console.log('🎨 View Routes:');
      console.log(`   • Login: http://localhost:${this.port}/login`);
      console.log(`   • Register: http://localhost:${this.port}/register`);
      console.log(`   • Forgot Password: http://localhost:${this.port}/forgot-password`);
      console.log('🔌 API Endpoints:');
      console.log(`   • POST /auth/api/login`);
      console.log(`   • POST /auth/api/register`);
      console.log(`   • POST /auth/api/forgot-password`);
      console.log(`   • GET /auth/api/logout`);
      console.log('=====================================');
      console.log('💡 To access the app, manually open: http://localhost:5050');
      console.log('⏹️  Press Ctrl+C to stop the server');
    });
  }
}

export default Server;
