import { Request, Response } from "express";

import { GetEmployeeService } from "../services/GetEmployeeService";

export class GetEmployeeController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const getEmployeeService = new GetEmployeeService();

    let employee = await getEmployeeService.execute({ userId });

    return response.json(employee);
  }
}
