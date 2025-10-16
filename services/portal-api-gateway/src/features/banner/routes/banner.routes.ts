import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import bannerController from '../controllers/banner.controller';

const bannerRouter = express.Router();

bannerRouter.post('/createBanners', asyncWrapper(bannerController.createBanner));
bannerRouter.get('/getBanners', asyncWrapper(bannerController.getBanners));

export default bannerRouter;
