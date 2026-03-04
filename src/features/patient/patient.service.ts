import jwt from "jsonwebtoken";
import prisma from "../../config/prisma";
import type { PatientInput, PatientLoginInput } from "./patient.schema";
import { error } from "../../constants/messages";
import { AppError } from "../../utils/AppError";

export async function CreatePatient(data: PatientInput) {
  const patient = await prisma.patient.upsert({
    where: { mobileNumber: data.mobileNumber },
    update: {},
    create: {
      name: data.name,
      dateOfBirth: new Date(data.dateOfBirth),  // ensure it's a Date object
      bloodGroup: data.bloodGroup,
      gender: data.gender,
      mobileNumber: data.mobileNumber,
    },
  });
  return patient;
}

//Login patient using mobile number and dateofBirth 
export async function LoginPatient(data: PatientLoginInput) {
  const patient = await prisma.patient.findUnique({
    where: { mobileNumber: data.mobileNumber },
  });
  if (!patient) {
    throw new AppError(error.INVALID_CREDENTIALS, 401);
  }
  if (patient.dateOfBirth.toISOString() !== data.dateOfBirth.toISOString()) {
    throw new AppError(error.INVALID_CREDENTIALS, 401);
  }
  const token = jwt.sign({ id: patient.id }, process.env.JWT_SECRET!, { expiresIn: "14d" });
  return { patient, token };
}
