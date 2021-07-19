import { hash } from "bcryptjs";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

import { Employee } from "../models/employee";

const BankInfoType = new GraphQLObjectType({
  name: "BankInfo",
  fields: () => ({
    bankName: { type: GraphQLString },
    holderName: { type: GraphQLString },
    expiryDate: { type: GraphQLString },
    paymentType: { type: GraphQLString },
    cardNumber: { type: GraphQLString },
    cvc: { type: GraphQLString },
  }),
});

const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    birthDate: { type: GraphQLString },
    gender: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    country: { type: GraphQLString },
    employeeId: { type: GraphQLString },
    designation: { type: GraphQLString },
    department: { type: GraphQLString },
    workingHours: { type: GraphQLInt },
    bankInfo: { type: BankInfoType },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Employee.findById(args.id);
      },
    },
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve(parent, args) {
        return Employee.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addEmployee: {
      type: EmployeeType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        birthDate: { type: new GraphQLNonNull(GraphQLString) },
        gender: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        employeeId: { type: new GraphQLNonNull(GraphQLString) },
        designation: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLString) },
        workingHours: { type: new GraphQLNonNull(GraphQLInt) },
        bankName: { type: new GraphQLNonNull(GraphQLString) },
        holderName: { type: new GraphQLNonNull(GraphQLString) },
        expiryDate: { type: new GraphQLNonNull(GraphQLString) },
        paymentType: { type: new GraphQLNonNull(GraphQLString) },
        cardNumber: { type: new GraphQLNonNull(GraphQLString) },
        cvc: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        let password = await hash(args.password, 8);

        let employee = new Employee({
          firstName: args.firstName,
          lastName: args.lastName,
          birthDate: args.birthDate,
          gender: args.gender,
          username: args.username,
          password,
          email: args.email,
          phone: args.phone,
          address: args.address,
          country: args.country,
          employeeId: args.employeeId,
          designation: args.designation,
          department: args.department,
          workingHours: args.workingHours,
          bankInfo: {
            bankName: args.bankName,
            holderName: args.holderName,
            expiryDate: args.expiryDate,
            paymentType: args.paymentType,
            cardNumber: args.cardNumber,
            cvc: args.cvc,
          },
        });
        return employee.save();
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation });
