const express = require("express");
const { getAllLabs,updateStatus,getBookedTest,getPatients,getLabById,updateLab,searchLabs,deleteLab } = require("../controllers/labsController.js");
const { labTestBooking } = require("../controllers/labsController.js");
const verifyToken = require("../../Middleware/authMiddleware.js");
const router = express.Router();
router.get("/test", (req, res) => {
  res.send("Lab routes are working!");
});

router.get("/all",verifyToken,getAllLabs);
router.post("/testBooking",verifyToken,labTestBooking);
router.patch("/updateStatus/:bookingId",updateStatus);
router.get("/getBookedTest/:id",getBookedTest);
router.get("/getPatients/:id",verifyToken,getPatients);
router.get("/getLab/:id",verifyToken,getLabById);
router.put("/updateLab/:id",verifyToken,updateLab);
router.get("/search",verifyToken,searchLabs);
router.delete("/deleteLab/:id",verifyToken,deleteLab);
module.exports = router;