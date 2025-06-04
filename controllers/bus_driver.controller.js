const { sendErrorResponse } = require("../helpers/send_error_response");
const Bus = require("../models/buses.model");
const Driver = require("../models/Driver.model");
const BusDriver = require("../models/bus_driver.model");

const addBusDriver = async (req, res) => {
  try {
    const { busId, driverId } = req.body;

    const bus = await Bus.findByPk(busId);
    if (!bus) {
      return sendErrorResponse({ message: "Bunday avtobus mavjud emas" }, res);
    }

    const driver = await Driver.findByPk(driverId);
    if (!driver) {
      return sendErrorResponse(
        { message: "Bunday haydovchi mavjud emas" },
        res
      );
    }

    await BusDriver.create({ busId, driverId });

    res.status(201).send({ message: "Haydovchi avtobusga qo‘shildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllBusDrivers = async (req, res) => {
  try {
    const busDrivers = await BusDriver.findAll({
      include: [
        {
          model: Bus,
          attributes: ["id", "number_plate"],
        },
        {
          model: Driver,
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(200).send({
      message: "Avtobus-haydovchi bog‘lanishlari",
      data: busDrivers,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

// ID orqali bitta bog‘lanishni olish
const getBusDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const busDriver = await BusDriver.findByPk(id, {
      include: [
        { model: Bus, attributes: ["id", "number_plate"] },
        { model: Driver, attributes: ["id", "name"] },
      ],
    });

    if (!busDriver) {
      return res.status(404).send({ message: "Bog‘lanish topilmadi" });
    }

    res.status(200).send({ message: "Bog‘lanish topildi", data: busDriver });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

// Haydovchini avtobusdan olib tashlash
const deleteBusDriver = async (req, res) => {
  try {
    const { id } = req.params;

    const busDriver = await BusDriver.findByPk(id);
    if (!busDriver) {
      return res.status(404).send({ message: "Bunday bog‘lanish mavjud emas" });
    }

    await busDriver.destroy();

    res.status(200).send({ message: "Haydovchi avtobusdan olib tashlandi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addBusDriver,
  getAllBusDrivers,
  getBusDriverById,
  deleteBusDriver,
};
