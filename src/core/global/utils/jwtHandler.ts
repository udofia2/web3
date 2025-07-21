/* eslint-disable @typescript-eslint/no-explicit-any */
"use strict";
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
// import { expressjwt } from 'express-jwt';
// import logger from './logger';
import { IattachTokenToResponse, IJWTPayload, IRefreshToken } from '../constants/interface';
import * as errorHandler from '../errors';
const secret = fs.readFileSync(path.join(__dirname, '../../.certs/private-key.pem'));
const publicKey = fs.readFileSync(path.join(__dirname, '../../.certs/public-key.pem'));

// const JWT_SECRET = process.env.JWT_SECRET || '';

export const createJWT = (payload: IJWTPayload) => {
    const token = jwt.sign(payload, secret, {
        expiresIn: "60mins", 
        algorithm: "RS256"
    });
    
    return token;
};

export const createRefreshToken = (payload:IRefreshToken ) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const token = jwt.sign(payload, secret, {
        expiresIn: Date.now() + oneDay,
        algorithm: "RS256"
    });

    return token;
}

export const isTokenValid = (token: string): IJWTPayload | void => {
  return jwt.verify(token, publicKey, function(err, decoded) {
      if(err){
        console.log({
          message: err.message,
          name: err.name,
        });

        throw new errorHandler.UnauthenticatedError("Invalid or expired token");
      }

      const payload = decoded;
      return payload;
  });

}

export const attachCookiesToResponse = ({ res, token, refresh_token }: IattachTokenToResponse) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const fiveMins = 1000 * 60 * 5;

  res.cookie('access_token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + fiveMins),
    secure: process.env.NODE_ENV === 'production',
    signed: true, 
    sameSite: 'none'
  });

  res.cookie('refresh_token', refresh_token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: 'none'
  });

};

export const attachSessionToCookies = ({res, session}: any) => {
    res.cookie('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
      sameSite: 'none'
    });
}

