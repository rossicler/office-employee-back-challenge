import { Router, Request, Response } from "express";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { CreateEmployeeController } from "./controllers/CreateEmployeeController";
import { AuthController } from "./controllers/AuthController";
import { GetEmployeeController } from "./controllers/GetEmployeeController";

export const router = Router();

const createEmployeeController = new CreateEmployeeController();
const authController = new AuthController();
const getEmployeeController = new GetEmployeeController();

router.post("/employees", createEmployeeController.handle);
router.post("/auth", authController.handle);
router.get("/employee", ensureAuthenticated, getEmployeeController.handle);
