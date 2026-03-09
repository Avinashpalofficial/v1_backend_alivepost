import express from "express";
import { MedicineSchema, type MedicineCreateSchema } from "./medicine.schema";
import { CreateMedicine } from "./medicine.service";

const medicineRouter = express.Router();

medicineRouter.post("/create", async (req, res, next) => {
  try {
    const data: MedicineCreateSchema = req.body;
    const safeData = MedicineSchema.parse(data);
    const medicine = await CreateMedicine(safeData)
    res.status(200).json({
      success:true,
      data: medicine
    })
  } catch (error) {
    next(error)
  }
});
export default medicineRouter
