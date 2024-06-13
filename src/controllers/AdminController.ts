import express, { Request, Response, NextFunction } from 'express';
import { CreateVandorInput } from '../dto';
import { Vandor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utility';

export const createVandor = async (req: Request, res: Response, next: NextFunction) => {
  const { name, ownerName, foodType, pincode, address, phone, email, password } = <CreateVandorInput>req.body;

  const existingVandor = await Vandor.findOne({ email: email });
  if (existingVandor !== null) {
    return res.json({ "message": "A vandor with this email address already exists." })
  }

  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(password, salt);

  const createdVandor = await Vandor.create({
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

  return res.json(createdVandor);

}

export const getVandors = async (req: Request, res: Response, next: NextFunction) => {

}

export const getVandorById = async (req: Request, res: Response, next: NextFunction) => {

}