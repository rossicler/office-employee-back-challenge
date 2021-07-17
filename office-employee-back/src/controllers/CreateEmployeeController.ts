import { Request, Response } from "express";
import { CreateEmployeeService } from "../services/CreateEmployeeService";

export class CreateEmployeeController {
  async handle(request: Request, response: Response) {
    const {
      firstName,
      lastName,
      birthDate,
      gender,
      username,
      password,
      email,
      phone,
      address,
      country,
      employeeId,
      designation,
      department,
      workingHours,
      bankName,
      holderName,
      expiryDate,
      paymentType,
      cardNumber,
      cvc,
    } = request.body;

    const createEmployeeService = new CreateEmployeeService();

    const employee = await createEmployeeService.execute({
      firstName,
      lastName,
      birthDate,
      gender,
      username,
      password,
      email,
      phone,
      address,
      country,
      employeeId,
      designation,
      department,
      workingHours,
      bankName,
      holderName,
      expiryDate,
      paymentType,
      cardNumber,
      cvc,
    });

    return response.json(employee);
  }
}
