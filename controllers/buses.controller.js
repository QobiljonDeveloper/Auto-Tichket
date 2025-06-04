const { sendErrorResponse } = require("../helpers/send_error_response");
const Buses = require("../models/buses.model");
const BusDriver = require("../models/bus_driver.model");

const addBus = async (req, res) => {
  try {
    const { number_plate, seat_count, model } = req.body;

    if (!number_plate || !seat_count || !model) {
      return sendErrorResponse(
        { message: "Barcha maydonlar to'ldirilishi shart" },
        res
      );
    }

    const candidate = await Buses.findOne({ where: { number_plate } });
    if (candidate) {
      return sendErrorResponse({ message: "Bunday bus mavjud" }, res);
    }

    const newBus = await Buses.create({
      number_plate,
      seat_count,
      model,
    });

    res.status(201).send({ message: "Yangi bus qo'shildi", bus: newBus });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllBuses = async (req, res) => {
  try {
    const buses = await Buses.findAll({
      include: [
        {
          model: BusDriver,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).send({ message: "Barcha Buslar", buses });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOneBusById = async (req, res) => {
  try {
    const { id } = req.params;
    const bus = await Buses.findByPk(id);
    if (!bus) {
      return res.status(404).send({ message: "Bus topilmadi" });
    }
    res.status(200).send(bus);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const { number_plate, seat_count, model } = req.body;

    const bus = await Buses.findByPk(id);
    if (!bus) {
      return res.status(404).send({ message: "Bus topilmadi" });
    }

    bus.number_plate = number_plate ?? bus.number_plate;
    bus.seat_count = seat_count ?? bus.seat_count;
    bus.model = model ?? bus.model;
    await bus.save();

    res.status(200).send({ message: "Bus yangilandi", bus });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;

    const bus = await Buses.findByPk(id);
    if (!bus) {
      return res.status(404).send({ message: "Bus topilmadi" });
    }

    await bus.destroy();

    res.status(200).send({ message: "Bus o'chirildi", bus });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addBus,
  getAllBuses,
  getOneBusById,
  updateBus,
  deleteBus,
};
