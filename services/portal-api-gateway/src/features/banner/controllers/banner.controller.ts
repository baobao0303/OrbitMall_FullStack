import { NextFunction, Request, Response } from 'express';
import Banner from '../models/banner.model';
import { NotFoundException } from '~/globals/cores/error.core';

class BannerController {
  public async createBanner(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageUrl, title, description } = req.body;

      const newBanner = await Banner.create({ imageUrl, title, description });
      await newBanner.save();
      res.status(201).json({
        message: 'Banner created successfully',
        data: newBanner
      });
    } catch (error) {
      next(error);
    }
  }

  public async getBanners(req: Request, res: Response, next: NextFunction) {
    try {
      const banners = await Banner.find();
      if (!banners) {
        return next(new NotFoundException('Banners not found'));
      }
      res.status(200).json({
        message: 'Banners fetched successfully',
        data: banners
      });
    } catch (error) {
      next(error);
    }
  }
}
const bannerController = new BannerController();
export default bannerController;
