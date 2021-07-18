import { compare } from "bcryptjs";
import { Employee } from "../models/employee";

interface IGetEmployeeRequest {
  userId: string;
}

export class GetEmployeeService {
  async execute({ userId }: IGetEmployeeRequest) {
    return await Employee.findById(userId).select("-password").exec();
  }
}
