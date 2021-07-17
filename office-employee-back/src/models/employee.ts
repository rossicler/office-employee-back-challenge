import { model, Schema, Model, Document } from "mongoose";

interface IEmployee extends Document {
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
  bankInfo: IBankInfo;
}

interface IBankInfo {
  bankName: string;
  holderName: string;
  expiryDate: string;
  paymentType: string;
  cardNumber: string;
  cvc: string;
}

const BankInfoSchema: Schema = new Schema({
  bankName: { type: String, required: true },
  holderName: { type: String, required: true },
  expiryDate: { type: String, required: true },
  paymentType: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cvc: { type: String, required: true },
});

const EmployeeSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: String, required: true },
  gender: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  employeeId: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  workingHours: { type: Number, required: true },
  bankInfo: { type: BankInfoSchema, required: true },
});

export const Employee: Model<IEmployee> = model("Employee", EmployeeSchema);
