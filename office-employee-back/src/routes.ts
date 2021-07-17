import { Router, Request, Response } from "express";

export const router = Router();

router.get("/", (request: Request, response: Response) => {
  return response.json({ success: true });
});
