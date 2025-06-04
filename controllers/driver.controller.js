const { sendErrorResponse } = require("../helpers/send_error_response");
const Driver = require("../models/Driver.model");
const Bus = require("../models/buses.model");

const addDriver = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return sendErrorResponse(
        { message: "Barcha maydonlar to'ldirilishi shart" },
        res
      );
    }

    const newDriver = await Driver.create({ name, phone });

    res
      .status(201)
      .send({ message: "Yangi driver qo'shildi", driver: newDriver });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll({
      include: [
        {
          model: Bus,
          attributes: ["number_plate"],
        },
      ],
    });

    res.status(200).send({ message: "Barcha driverlar", drivers });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};


const getOneDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findByPk(id);
    if (!driver) {
      return res.status(404).send({ message: "Driver topilmadi" });
    }
    res.status(200).send({ message: "Driver topildi", driver });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;

    const driver = await Driver.findByPk(id);
    if (!driver) {
      return res.status(404).send({ message: "Driver topilmadi" });
    }

    driver.name = name ?? driver.name;
    driver.phone = phone ?? driver.phone;
    await driver.save();

    res.status(200).send({ message: "Driver yangilandi", driver });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;

    const driver = await Driver.findByPk(id);
    if (!driver) {
      return res.status(404).send({ message: "Driver topilmadi" });
    }

    await driver.destroy();

    res.status(200).send({ message: "Driver o'chirildi", driver });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDriver,
  getAllDrivers,
  getOneDriverById,
  updateDriver,
  deleteDriver,
};
