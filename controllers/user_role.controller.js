const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/roles.model");
const UserRole = require("../models/user_role");
const User = require("../models/user.model");

const addUserRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    const user = await User.findByPk(userId, {
      include: { model: Role, attributes: ["id"] },
    });

    console.log(user);
    if (!user) {
      return sendErrorResponse({ message: "Bunday user mavjud emas" }, res);
    }

    const hasRolee = await user.hasRole(roleId);

    if (hasRolee) {
      return sendErrorResponse({ message: "Bu rol allaqachon mavjud" }, res);
    }

    const role = await Role.findByPk(roleId);
    if (!role) {
      return sendErrorResponse({ message: "Bunday Role mavjud emas" }, res);
    }

    const newUserRole = await user.addRole(roleId);
    res
      .status(201)
      .send({ message: "Userga yani Role qo'shildi", newUserRole });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRole.findAll({
      include: [
        {
          model: User,
          attributes: ["full_name"],
        },
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).send({ message: "Rolelar ro'yxat", userRoles });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const userRole = await UserRole.findByPk(id);
    res.status(200).send(userRole);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteUserRole = async (req, res) => {
  try {
    const { id } = req.params;

    const userRole = await UserRole.findByPk(id);
    if (!userRole) {
      return res.status(404).send({ message: "Bunday userRole mavjud emas" });
    }

    const user = await User.findByPk(userRole.userId, {
      include: {
        model: Role,
        attributes: ["id"],
        through: { attributes: [] },
      },
    });

    if (!user) {
      return sendErrorResponse(
        { message: "Bunday foydalanuvchi mavjud emas" },
        res
      );
    }

    const hasRolee = await user.hasRole(userRole.roleId);
    if (!hasRolee) {
      return sendErrorResponse(
        { message: "Foydalanuvchida bu rol mavjud emas" },
        res
      );
    }

    await user.removeRole(userRole.roleId);

    res.status(200).send({ message: "Role foydalanuvchidan olib tashlandi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addUserRole,
  getAllUserRoles,
  getById,
  deleteUserRole,
};
