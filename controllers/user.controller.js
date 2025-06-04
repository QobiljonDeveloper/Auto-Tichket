const { sendErrorResponse } = require("../helpers/send_error_response");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Role = require("../models/roles.model");

const addUser = async (req, res) => {
  try {
    const { full_name, phone, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas" }, res);
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse({ message: "Bunday foydalanuvchi mavjud" }, res);
    }

    const hashed_password = await bcrypt.hash(password, 8);

    const newUser = await User.create({
      full_name,
      phone,
      email,
      hashed_password,
    });

    res
      .status(201)
      .send({ message: "Yangi foydalanuvchi qo'shildi", user: newUser });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).send({ message: "Barcha Userlar", users });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOneUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "User topilmadi" });
    }
    res.status(200).send(user);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, phone, email, password, confirm_password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "User topilmadi" });
    }

    if (password) {
      if (!confirm_password) {
        return sendErrorResponse(
          { message: "Tasdiqlovchi parol (confirm_password) kerak" },
          res
        );
      }
      if (password !== confirm_password) {
        return sendErrorResponse({ message: "Parollar mos emas" }, res);
      }

      const hashed_password = await bcrypt.hash(password, 8);
      user.hashed_password = hashed_password;
    }

    user.full_name = full_name ?? user.full_name;
    user.phone = phone ?? user.phone;
    user.email = email ?? user.email;

    await user.save();

    res.status(200).send({ message: "Foydalanuvchi yangilandi", user });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "User topilmadi" });
    }

    await user.destroy();

    res.status(200).send({ message: "User o'chirildi", user });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getOneUserById,
  updateUser,
  deleteUser,
};
