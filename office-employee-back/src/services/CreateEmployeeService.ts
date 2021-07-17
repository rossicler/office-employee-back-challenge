import { hash } from "bcryptjs";
import { response } from "express";

import { Employee } from "../models/employee";
import { ValidationUtils } from "../utils/validation";

interface IEmployeeRequest {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  employeeId: string;
  designation: string;
  department: string;
  workingHours: number;
  bankName: string;
  holderName: string;
  expiryDate: string;
  paymentType: string;
  cardNumber: string;
  cvc: string;
}

export class CreateEmployeeService {
  async execute(employeeData: IEmployeeRequest) {
    // Validate fields
    const requiredFields = [
      "firstName",
      "lastName",
      "birthDate",
      "gender",
      "username",
      "password",
      "email",
      "phone",
      "address",
      "country",
      "employeeId",
      "designation",
      "department",
      "workingHours",
      "bankName",
      "holderName",
      "expiryDate",
      "paymentType",
      "cardNumber",
      "cvc",
    ];
    const validationUtils = new ValidationUtils();
    const missingKeys = validationUtils.requiredFields(
      requiredFields,
      employeeData
    );
    if (missingKeys.length > 0) {
      throw new Error("Missing fields: " + missingKeys.join(", "));
    }

    const usernameAlreadyExists = await Employee.find({
      username: employeeData.username,
    }).exec();
    if (usernameAlreadyExists.length > 0)
      throw new Error("Username already exists");

    const emailAlreadyExists = await Employee.find({
      email: employeeData.email,
    }).exec();
    if (emailAlreadyExists.length > 0) throw new Error("Email already exists");

    let password = await hash(employeeData.password, 8);

    const employee = new Employee({
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      birthDate: employeeData.birthDate,
      gender: employeeData.gender,
      username: employeeData.username,
      password,
      email: employeeData.email,
      phone: employeeData.phone,
      address: employeeData.address,
      country: employeeData.country,
      employeeId: employeeData.employeeId,
      designation: employeeData.designation,
      department: employeeData.department,
      workingHours: employeeData.workingHours,
      bankInfo: {
        bankName: employeeData.bankName,
        holderName: employeeData.holderName,
        expiryDate: employeeData.expiryDate,
        paymentType: employeeData.paymentType,
        cardNumber: employeeData.cardNumber,
        cvc: employeeData.cvc,
      },
    });

    return employee.save();
  }
}
