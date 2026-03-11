

import prisma from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import jwtTokenSigner from "../../utils/jwttokensigner";
import type { HospitalCreate, HospitalLogin } from "./hospital.schema";
import bcrypt from "bcrypt"
export async function HospitalCreate(data:HospitalCreate){
    const hospital = await prisma.hospital.create({
        data:{
            name: data.name,
            helplineNumber: data.helplineNumber,
            address: data.address,
            userId: data.userId,
            password: data.password,
        },
        select:{
            id: true,
            name: true,
            helplineNumber:true,
            address:true,
            userId:true,
            createdAt: true,
      updatedAt: true
        }
    })
    return hospital;
}
export async function HospitalLogin(data: HospitalLogin) {
  const hospital = await prisma.hospital.findUnique({
    where: {
      userId: data.userId
    }
  })

  if (!hospital) {
    throw new AppError("Invalid userId or password", 401)
  }

  const verify = await bcrypt.compare(data.password, hospital.password)

  if (!verify) {
    throw new AppError("Invalid userId or password", 401)
  }

  const user = {
    id: hospital.id,
    role: "Hospital" 
  }

  const token = jwtTokenSigner(user)
  const {password, ...safeData}= hospital

  return {safeData, token}
}