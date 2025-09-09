import { Router } from 'express';

const router = Router();

// ===== VIEW ROUTES (Render HTML) =====
router.get('/login', (req, res) => {
  console.log('🔗 View route: /login');
  res.render('auth/login', {
    title: 'Login',
    layout: 'layouts/auth', // Sử dụng auth layout
    error: req.query.error || null,
    success: req.query.success || null
  });
});

router.get('/register', (req, res) => {
  console.log('🔗 View route: /register');
  res.render('auth/register', {
    title: 'Register',
    layout: 'layouts/auth', // Sử dụng auth layout
    error: req.query.error || null,
    success: req.query.success || null
  });
});

router.get('/forgot-password', (req, res) => {
  console.log('🔗 View route: /forgot-password');
  res.render('auth/forgot-password', {
    title: 'Forgot Password',
    layout: 'layouts/auth', // Sử dụng auth layout
    error: req.query.error || null,
    success: req.query.success || null
  });
});

export default router;
