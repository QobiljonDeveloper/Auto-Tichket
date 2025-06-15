const BusSchedule = require("../models/bus_schedule.model");
const { sendErrorResponse } = require("../helpers/send_error_response");

const createBusSchedule = async (req, res) => {
  try {
    const schedule = await BusSchedule.create(req.body);
    res.status(201).send({ message: "Avtobus jadvali yaratildi", schedule });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAllBusSchedules = async (req, res) => {
  try {
    const schedules = await BusSchedule.findAll();
    res.status(200).send({ message: "Jadvallar ro‘yxati", schedules });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findBusScheduleById = async (req, res) => {
  try {
    const schedule = await BusSchedule.findByPk(req.params.id);
    if (!schedule)
      return sendErrorResponse({ message: "Jadval topilmadi" }, res, 404);
    res.status(200).send({ message: "Jadval topildi", schedule });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateBusSchedule = async (req, res) => {
  try {
    const schedule = await BusSchedule.findByPk(req.params.id);
    if (!schedule)
      return sendErrorResponse({ message: "Jadval topilmadi" }, res, 404);
    await schedule.update(req.body);
    res.status(200).send({ message: "Jadval yangilandi", schedule });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const deleteBusSchedule = async (req, res) => {
  try {
    const schedule = await BusSchedule.findByPk(req.params.id);
    if (!schedule)
      return sendErrorResponse({ message: "Jadval topilmadi" }, res, 404);
    await schedule.destroy();
    res.status(200).send({ message: "Jadval o‘chirildi" });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  createBusSchedule,
  findAllBusSchedules,
  findBusScheduleById,
  updateBusSchedule,
  deleteBusSchedule,
};
