import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export const getUserIdFromToken = (token) => {
  const { sub } = verify(token, process.env.AUTH_KEY) as IPayload;
  return sub;
};
