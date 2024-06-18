import express, { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto';
import { Vendor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utility';

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
  const { name, ownerName, foodType, pincode, address, phone, email, password } = <CreateVendorInput>req.body;

  const existingVendor = await Vendor.findOne({ email: email });
  if (existingVendor !== null) {
    return res.json({ "message": "A vendor with this email address already exists." })
  }

  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(password, salt);

  const createdVendor = await Vendor.create({
    name: name, 
    ownerName: ownerName, 
    foodType: foodType, 
    pincode: pincode, 
    address: address, 
    phone: phone, 
    email: email, 
    password: userPassword,
    salt: salt,
    rating: 0,
    serviceAvailable: false,
    coverImages: []
  })

  return res.json(createdVendor);

}

export const getVendors = async (req: Request, res: Response, next: NextFunction) => {

}

export const getVendorById = async (req: Request, res: Response, next: NextFunction) => {

}