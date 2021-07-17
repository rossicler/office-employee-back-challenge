import { compare } from "bcryptjs";
import { Employee } from "../models/employee";

interface IGetEmployeeRequest {
  userId: string;
}

export class GetEmployeeService {
  async execute({ userId }: IGetEmployeeRequest) {
    const employee = await Employee.findById(userId).exec();
    return employee;
  }
}
