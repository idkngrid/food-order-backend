import { NextFunction, Request, Response } from "express";
import { VendorLoginInput } from "../dto";
import { findVendor } from "./AdminController";
import { validatePassword } from "../utility";

export const vendorLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = <VendorLoginInput>req.body;

  const existingVendor = await findVendor('', email);

  if(existingVendor !== null) {
    const validation = await validatePassword(password, existingVendor.password, existingVendor.salt);

    if(validation) {
      return res.json(existingVendor);
    } else {
      return res.json({"message": "Password is not valid"});
    }
  }
  
  return res.json({"message": "Login credentials not valid"});
}