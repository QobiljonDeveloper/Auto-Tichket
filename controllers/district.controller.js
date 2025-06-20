const { sendErrorResponse } = require("../helpers/send_error_response");
const District = require("../models/district.model");
const Region = require("../models/regions.model");

const addDistrict = async (req, res) => {
  try {
    const { name, regionId } = req.body;

    const district = await Region.findByPk(regionId);
    if (!district) {
      return sendErrorResponse({ message: "Bunday Region mavjud emas" }, res);
    }
    const newDistrict = await District.create({ name, regionId });

    res.status(201).send({ message: "District yaratildi", newDistrict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.findAll({
      include: [
        {
          model: Region,
          attributes: ["name"],
        },
      ],
      attributes: ["id", "name"],
    });
    res.status(200).send(districts);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await District.findByPk(id, {
      include: [
        {
          model: Region,
          attributes: ["name"],
        },
      ],
      attributes: ["id", "name"],
    });
    res.status(200).send(district);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const district = await District.findByPk(id);
    if (!district) {
      return res.status(404).send({ message: "Bunday district mavjud emas" });
    }
    district.name = name;
    await district.save();
    res.status(200).send({ message: "District yangilandi", district });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await District.findByPk(id);
    if (!district) {
      return res.status(404).send({ message: "Bunday district mavjud emas" });
    }
    await district.destroy();
    res.status(200).send({ message: "District o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDistrict,
  getAllDistricts,
  getById,
  updateDistrict,
  deleteDistrict,
};
