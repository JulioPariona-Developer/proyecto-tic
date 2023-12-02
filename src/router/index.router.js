const { Router } = require('express');
const errorMiddleware = require('../middlewares/error.middleware');
const routeExist = require('../middlewares/routeExist.middleware');
// const authRoutes = require('./routes/auth/routes');
const webSiteRoutes = require('./routes/website/routes');

const router = Router();

// Routes
// router.use('/auth', authRoutes);
router.use('/', webSiteRoutes);

// NotFoundPage middleware
router.use("/*", routeExist);

// Error middleware
router.use(errorMiddleware);

module.exports = router;