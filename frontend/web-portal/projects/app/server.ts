import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const clientIndexHtml = join(browserDistFolder, 'index.csr.html');

  // Read SSR routes from routes.txt
  let ssrRoutes: string[] = [];
  try {
    // Try multiple possible paths for routes.txt
    const possiblePaths = [
      resolve(serverDistFolder, '../../routes.txt'),
      resolve(serverDistFolder, '../../../routes.txt'),
      resolve(process.cwd(), 'routes.txt')
    ];
    
    let routesContent = '';
    for (const routesFile of possiblePaths) {
      try {
        routesContent = readFileSync(routesFile, 'utf-8');
        console.log('📋 Found routes.txt at:', routesFile);
        break;
      } catch (e) {
        // Try next path
      }
    }
    
    if (routesContent) {
      ssrRoutes = routesContent.split('\n').filter(route => route.trim()).map(route => route.trim());
      console.log('📋 SSR Routes loaded:', ssrRoutes);
    } else {
      throw new Error('No routes.txt found');
    }
  } catch (error) {
    console.log('⚠️ No routes.txt found, defaulting to SSR for all routes');
    ssrRoutes = ['*']; // Default to SSR all routes if no file
  }

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Helper function to check if route should use SSR
  const shouldUseSSR = (url: string): boolean => {
    if (ssrRoutes.includes('*')) return true;
    return ssrRoutes.some(route => {
      // Exact match or starts with route
      return url === route || url.startsWith(route + '/') || url.startsWith(route + '?');
    });
  };

  // All regular routes - selective SSR or CSR
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    const pathname = new URL(originalUrl, `${protocol}://${headers.host}`).pathname;

    if (shouldUseSSR(pathname)) {
      console.log('🔄 SSR rendering:', pathname);
      // Use Angular SSR engine
      commonEngine
        .render({
          bootstrap,
          documentFilePath: indexHtml,
          url: `${protocol}://${headers.host}${originalUrl}`,
          publicPath: browserDistFolder,
          providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        })
        .then((html) => res.send(html))
        .catch((err) => next(err));
    } else {
      console.log('📄 CSR serving:', pathname);
      // Serve static client-side HTML
      res.sendFile(clientIndexHtml);
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
