import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  try {
    const token = extractToken(authToken);
    const { sub } = verify(token, process.env.AUTH_KEY) as IPayload;

    request.userId = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}

const extractToken = (authToken) => {
  const regexToken = /Bearer (.*)/g;
  return regexToken.exec(authToken)[1];
};
