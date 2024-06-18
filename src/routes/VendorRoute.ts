import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hellon from Vendor Route." });
})

export { router as VendorRoute };