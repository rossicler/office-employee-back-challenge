import { Router, Request, Response } from "express";

import { CreateEmployeeController } from "./controllers/CreateEmployeeController";

export const router = Router();

const createEmployeeController = new CreateEmployeeController();

router.post("/employees", createEmployeeController.handle);
