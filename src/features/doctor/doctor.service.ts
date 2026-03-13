import prisma from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { COMMON_ERROR } from "../../constants/messages";

// Create Doctor Service
export const createDoctorService = async (
  name: string,
  username: string,
  hospitalId: number,
) => {
  // Check if hospital exists
  const hospital = await prisma.hospital.findUnique({
    where: { id: hospitalId },
  });

  if (!hospital) {
    throw new AppError(COMMON_ERROR.INVALID_HOSPITAL, 400);
  }

  // Check if username already exists
  const existingDoctor = await prisma.doctor.findUnique({
    where: { username },
  });

  if (existingDoctor) {
    throw new AppError("Username already exists", 409);
  }

  // Create doctor
  const doctor = await prisma.doctor.create({
    data: {
      name,
      username,
      hospitalId,
    },
    select: {
      id: true,
      name: true,
      username: true,
      hospitalId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return doctor;
};
