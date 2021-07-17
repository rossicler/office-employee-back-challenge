import { Router, Request, Response } from "express";

import { CreateEmployeeController } from "./controllers/CreateEmployeeController";
import { AuthController } from "./controllers/AuthController";

export const router = Router();

const createEmployeeController = new CreateEmployeeController();
const authController = new AuthController();

router.post("/employees", createEmployeeController.handle);
router.post("/auth", authController.handle);
