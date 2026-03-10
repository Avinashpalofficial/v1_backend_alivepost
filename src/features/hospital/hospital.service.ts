import prisma from "../../config/prisma";
import type { HospitalCreate } from "./hospital.schema";

export async function HospitalCreate(data:HospitalCreate){
    const hospital = await prisma.hospital.create({
        data:{
            name: data.name,
            helplineNumber: data.helplineNumber,
            address: data.address,
            userId: data.userId,
            password: data.password,
        }
    })
    return hospital;
}