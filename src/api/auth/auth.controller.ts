import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/user.model';
import { userRegisterSchema } from './auth.validation';
import { logger } from '../../app';

export const register = async (req: Request, res: Response) => {
  try {
    const data: any = userRegisterSchema.safeParse(req.body);

    const { email, password } = data.data;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'email and password are required',
      });
    }

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists. Please login to continue',
      });
    }

    const username = email.trim('@')[0];

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (error) {
    logger.error({ Error: error });
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
