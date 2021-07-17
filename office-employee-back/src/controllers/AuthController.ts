import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authService = new AuthService();

    const token = await authService.execute({
      username,
      password,
    });

    return response.json(token);
  }
}
