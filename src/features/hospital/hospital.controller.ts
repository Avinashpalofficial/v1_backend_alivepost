import express from "express"
import { AuthUser } from "../../middleware/Auth"
import { HospitalSchema } from "./hospital.schema"
import { HospitalCreate } from "./hospital.service"

const hospitalRouter = express.Router()
//for now i have removed the admin logic as it require to have admin
hospitalRouter.post("/create",  async (req, res, next) => {
  try {
    // const user = req.user!   // guaranteed by middleware

    // if (user.role !== "Admin") {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Only admin can create hospitals",
    //   })
    // }

    const safeData = HospitalSchema.parse(req.body)

    const hospital = await HospitalCreate(safeData)

    res.status(201).json({
      success: true,
      data: hospital
    })

  } catch (error) {
    next(error)
  }
})

export default hospitalRouter