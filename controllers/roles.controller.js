const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/roles.model");
const User = require("../models/user.model");

const addRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    const position = await Role.findOne({
      where: { name: name.toLowerCase() },
    });

    if (position) {
      return sendErrorResponse({ message: "Bunday Role mavjud" }, res);
    }

    const newRole = await Role.create({
      name: name.toLowerCase(),
      description,
    });

    res.status(201).send({ message: "Role yaratildi", newRole });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [
        {
          model: User,
          attributes: ["full_name", "phone"],
        },
      ],
      attributes: ["id", "name"],
    });
    res.status(200).send({ message: "Rolelar ro'yxat", roles });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    res.status(200).send(role);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).send({ message: "Bunday role mavjud emas" });
    }
    role.name = name;
    role.description = description;
    await role.save();
    res.status(200).send({ message: "Role yangilandi", role });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).send({ message: "Bunday role mavjud emas" });
    }
    await role.destroy();
    res.status(200).send({ message: "Role o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addRole,
  getAllRoles,
  getById,
  updateRole,
  deleteRole,
};
