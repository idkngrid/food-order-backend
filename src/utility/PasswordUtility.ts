import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthPayload, VendorPayload } from '../dto';
import { APP_SECRET } from '../config';
import { Request } from 'express';

export const generateSalt = async () => {
  return await bcrypt.genSalt();
}

export const generatePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
}

export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
  return await generatePassword(enteredPassword, salt) === savedPassword;
}

export const generateSignature = (payload: VendorPayload) => {
  return jwt.sign(payload, APP_SECRET!, { expiresIn: '1d' });
}

export const validateSignature = async (req: Request) => {
  const signature = req.get('Authorization');

  if(signature) {
    const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET!) as unknown as AuthPayload;
    req.user = payload;
    return true;
  }

  return false;
}