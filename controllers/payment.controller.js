const Payment = require("../models/payment.mode");
const { sendErrorResponse } = require("../helpers/send_error_response");

const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).send({ message: "To‘lov yaratildi", payment });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).send({ message: "To‘lovlar ro‘yxati", payments });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment)
      return sendErrorResponse({ message: "To‘lov topilmadi" }, res, 404);
    res.status(200).send({ message: "To‘lov topildi", payment });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment)
      return sendErrorResponse({ message: "To‘lov topilmadi" }, res, 404);
    await payment.update(req.body);
    res.status(200).send({ message: "To‘lov yangilandi", payment });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment)
      return sendErrorResponse({ message: "To‘lov topilmadi" }, res, 404);
    await payment.destroy();
    res.status(200).send({ message: "To‘lov o‘chirildi" });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  createPayment,
  findAllPayments,
  findPaymentById,
  updatePayment,
  deletePayment,
};
