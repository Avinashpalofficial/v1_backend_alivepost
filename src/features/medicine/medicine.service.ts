import prisma from "../../config/prisma";
import type { MedicineCreateSchema } from "./medicine.schema";

import { Prisma } from "@prisma/client";

export async function CreateMedicine(data: MedicineCreateSchema) {
  try {
    const medicine = await prisma.medicine.create({
      data
    });

    return medicine;

  } catch (error) {
    console.log(error)
    throw error;
  }
}