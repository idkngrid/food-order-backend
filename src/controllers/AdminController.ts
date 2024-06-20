import express, { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto';
import { Vendor } from '../models';
import { generatePassword, generateSalt } from '../utility';

export const findVendor = async (id: string | undefined, email?: string) => {
  if(email) {
    return await Vendor.findOne({ email: email });
  } else {
    return await Vendor.findById(id);
  }
}

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
  const { name, ownerName, foodType, pincode, address, phone, email, password } = <CreateVendorInput>req.body;

  const existingVendor = await findVendor('', email)
  if (existingVendor !== null) {
    return res.json({ "message": "A vendor with this email address already exists." })
  }

  const salt = await generateSalt();
  const userPassword = await generatePassword(password, salt);

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
  const vendors = await Vendor.find();
  if (vendors !== null) {
    return res.json(vendors);
  }

  return res.json({ "message": "Vendors data not available." })
}

export const getVendorById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const vendor = await findVendor(id);

  if (vendor !== null) {
    return res.json(vendor);
  }

  return res.json({ "message": "Vendor not found." })
}