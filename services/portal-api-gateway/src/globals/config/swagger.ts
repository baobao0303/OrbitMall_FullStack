import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'OrbitMall Ecommerce API',
    version: '1.0.0'
  },
  servers: [
    { url: 'http://localhost:5050/api/v1' }
  ],
  paths: {
    '/auth/signup': {
      post: {
        summary: 'Signup',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  fullName: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                  role: { type: 'string' },
                  state: { type: 'string' },
                  city: { type: 'string' },
                  locality: { type: 'string' },
                  phone: { type: 'string' }
                },
                required: ['name','fullName','email','password','role','state','city','locality','phone']
              }
            }
          }
        },
        responses: { '201': { description: 'Created' } }
      }
    },
    '/auth/signin': {
      post: {
        summary: 'Signin',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { email: { type: 'string' }, password: { type: 'string' } },
                required: ['email','password']
              }
            }
          }
        },
        responses: { '200': { description: 'OK' } }
      }
    },
    '/auth/forgot-password': {
      post: {
        summary: 'Forgot password (immediate random reset on server)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { email: { type: 'string' } }, required: ['email'] }
            }
          }
        },
        responses: { '200': { description: 'OK' } }
      }
    },
    '/auth/reset-password': {
      post: {
        summary: 'Send reset link via email',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { email: { type: 'string' } }, required: ['email'] }
            }
          }
        },
        responses: { '200': { description: 'Email sent' } }
      }
    },
    '/auth/reset-password-phone': {
      post: {
        summary: 'Send OTP via SMS',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { phone: { type: 'string' } }, required: ['phone'] }
            }
          }
        },
        responses: { '200': { description: 'OTP sent' } }
      }
    },
    '/auth/verify-otp': {
      post: {
        summary: 'Verify OTP from SMS',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { phone: { type: 'string' }, otp: { type: 'string' } },
                required: ['phone', 'otp']
              }
            }
          }
        },
        responses: { '200': { description: 'OTP verified' } }
      }
    },
    '/auth/update-password': {
      post: {
        summary: 'Update password using accessToken',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { password: { type: 'string' }, accessToken: { type: 'string' } },
                required: ['password', 'accessToken']
              }
            }
          }
        },
        responses: { '200': { description: 'Password updated' } }
      }
    },
    '/users/me': {
      get: {
        summary: 'Get current user by email (temporary)',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', properties: { email: { type: 'string' } }, required: ['email'] } } }
        },
        responses: { '200': { description: 'OK' } }
      }
    },
    '/banner/createBanners': {
      post: {
        summary: 'Create banners',
        responses: { '201': { description: 'Created' } }
      }
    },
    '/banner/getBanners': {
      get: { summary: 'Get banners', responses: { '200': { description: 'OK' } } }
    }
  }
};

export default function setupSwagger(app: Application) {
  // Serve raw spec so UI loads our document (not Petstore)
  app.get('/swagger.json', (_req, res) => {
    res.json(swaggerDocument);
  });

  // Serve Swagger UI at /swagger (accessible at /swagger/index.html)
  app.use(
    '/swagger',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: { url: '/swagger.json', docExpansion: 'none', defaultModelsExpandDepth: -1 },
      customSiteTitle: 'OrbitMall API Docs'
    })
  );
}


