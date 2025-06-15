const SubRoute = require("../models/sub.route.model");
const { sendErrorResponse } = require("../helpers/send_error_response");

const createSubRoute = async (req, res) => {
  try {
    const subRoute = await SubRoute.create(req.body);
    res.status(201).send({ message: "Sub marshrut yaratildi", subRoute });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAllSubRoutes = async (req, res) => {
  try {
    const subRoutes = await SubRoute.findAll();
    res.status(200).send({ message: "Sub marshrutlar ro‘yxati", subRoutes });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findSubRouteById = async (req, res) => {
  try {
    const subRoute = await SubRoute.findByPk(req.params.id);
    if (!subRoute)
      return sendErrorResponse({ message: "Sub marshrut topilmadi" }, res, 404);
    res.status(200).send({ message: "Sub marshrut topildi", subRoute });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateSubRoute = async (req, res) => {
  try {
    const subRoute = await SubRoute.findByPk(req.params.id);
    if (!subRoute)
      return sendErrorResponse({ message: "Sub marshrut topilmadi" }, res, 404);
    await subRoute.update(req.body);
    res.status(200).send({ message: "Sub marshrut yangilandi", subRoute });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const deleteSubRoute = async (req, res) => {
  try {
    const subRoute = await SubRoute.findByPk(req.params.id);
    if (!subRoute)
      return sendErrorResponse({ message: "Sub marshrut topilmadi" }, res, 404);
    await subRoute.destroy();
    res.status(200).send({ message: "Sub marshrut o‘chirildi" });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  createSubRoute,
  findAllSubRoutes,
  findSubRouteById,
  updateSubRoute,
  deleteSubRoute,
};
