const TicketPassenger = require("../models/ticket.passengers.model");
const { sendErrorResponse } = require("../helpers/send_error_response");

const createTicketPassenger = async (req, res) => {
  try {
    const newTicket = await TicketPassenger.create(req.body);
    res
      .status(201)
      .send({ message: "Chiptali yo‘lovchi yaratildi", ticket: newTicket });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAllTicketPassengers = async (req, res) => {
  try {
    const tickets = await TicketPassenger.findAll();
    res.status(200).send({ message: "Barcha chiptalar", tickets });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findTicketPassengerById = async (req, res) => {
  try {
    const ticket = await TicketPassenger.findByPk(req.params.id);
    if (!ticket)
      return sendErrorResponse({ message: "Chipta topilmadi" }, res, 404);
    res.status(200).send({ message: "Chipta topildi", ticket });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateTicketPassenger = async (req, res) => {
  try {
    const ticket = await TicketPassenger.findByPk(req.params.id);
    if (!ticket)
      return sendErrorResponse({ message: "Chipta topilmadi" }, res, 404);
    await ticket.update(req.body);
    res.status(200).send({ message: "Chipta yangilandi", ticket });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const deleteTicketPassenger = async (req, res) => {
  try {
    const ticket = await TicketPassenger.findByPk(req.params.id);
    if (!ticket)
      return sendErrorResponse({ message: "Chipta topilmadi" }, res, 404);
    await ticket.destroy();
    res.status(200).send({ message: "Chipta o‘chirildi" });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  createTicketPassenger,
  findAllTicketPassengers,
  findTicketPassengerById,
  updateTicketPassenger,
  deleteTicketPassenger,
};
