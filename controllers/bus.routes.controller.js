const BusRoute = require("../models/bus.routes.model");
const { sendErrorResponse } = require("../helpers/send_error_response");

const createBusRoute = async (req, res) => {
  try {
    const route = await BusRoute.create(req.body);
    res.status(201).send({ message: "Yo‘nalish yaratildi", route });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAllBusRoutes = async (req, res) => {
  try {
    const routes = await BusRoute.findAll();
    res.status(200).send({ message: "Yo‘nalishlar ro‘yxati", routes });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findBusRouteById = async (req, res) => {
  try {
    const route = await BusRoute.findByPk(req.params.id);
    if (!route)
      return sendErrorResponse({ message: "Yo‘nalish topilmadi" }, res, 404);
    res.status(200).send({ message: "Yo‘nalish topildi", route });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateBusRoute = async (req, res) => {
  try {
    const route = await BusRoute.findByPk(req.params.id);
    if (!route)
      return sendErrorResponse({ message: "Yo‘nalish topilmadi" }, res, 404);
    await route.update(req.body);
    res.status(200).send({ message: "Yo‘nalish yangilandi", route });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const deleteBusRoute = async (req, res) => {
  try {
    const route = await BusRoute.findByPk(req.params.id);
    if (!route)
      return sendErrorResponse({ message: "Yo‘nalish topilmadi" }, res, 404);
    await route.destroy();
    res.status(200).send({ message: "Yo‘nalish o‘chirildi" });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  createBusRoute,
  findAllBusRoutes,
  findBusRouteById,
  updateBusRoute,
  deleteBusRoute,
};
