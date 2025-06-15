const RouteStop = require("../models/route.stop.model");
const { sendErrorResponse } = require("../helpers/send_error_response");

const createRouteStop = async (req, res) => {
  try {
    const stop = await RouteStop.create(req.body);
    res
      .status(201)
      .send({ message: "Yo‘nalish to‘xtash joyi yaratildi", stop });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAllRouteStops = async (req, res) => {
  try {
    const stops = await RouteStop.findAll();
    res.status(200).send({ message: "Barcha to‘xtash joylari", stops });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findRouteStopById = async (req, res) => {
  try {
    const stop = await RouteStop.findByPk(req.params.id);
    if (!stop)
      return sendErrorResponse(
        { message: "To‘xtash joyi topilmadi" },
        res,
        404
      );
    res.status(200).send({ message: "To‘xtash joyi topildi", stop });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateRouteStop = async (req, res) => {
  try {
    const stop = await RouteStop.findByPk(req.params.id);
    if (!stop)
      return sendErrorResponse(
        { message: "To‘xtash joyi topilmadi" },
        res,
        404
      );
    await stop.update(req.body);
    res.status(200).send({ message: "To‘xtash joyi yangilandi", stop });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const deleteRouteStop = async (req, res) => {
  try {
    const stop = await RouteStop.findByPk(req.params.id);
    if (!stop)
      return sendErrorResponse(
        { message: "To‘xtash joyi topilmadi" },
        res,
        404
      );
    await stop.destroy();
    res.status(200).send({ message: "To‘xtash joyi o‘chirildi" });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  createRouteStop,
  findAllRouteStops,
  findRouteStopById,
  updateRouteStop,
  deleteRouteStop,
};
