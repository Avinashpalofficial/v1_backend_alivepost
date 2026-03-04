import express from "express";
import { patientLoginSchema, patientSchema, type PatientInput, type PatientLoginInput } from "./patient.schema";
import { CreatePatient, LoginPatient } from "./patient.service";
const patientRouter = express.Router();

patientRouter.post("/create", async (req, res, next) => {
  const data: PatientInput = req.body;
  try {
    const safeData = patientSchema.parse(data);
    const patient = await CreatePatient(safeData)
    res.status(200).json({
      success: true,
      data: patient
    })
  } catch (error) {
    next(error)
  }
});
patientRouter.post("/login", async (req, res, next) => {
  const data: PatientLoginInput = req.body;
  try {
    const safeData = patientLoginSchema.parse(data);
    const patient = await LoginPatient(safeData)
    res.status(200).cookie("token", patient.token).json({
      success: true,
      data: patient
    })

  } catch (error) {
    next(error)
  }
})

export default patientRouter;


