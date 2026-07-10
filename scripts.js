const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../src/models/User");

mongoose.connect(process.env.MONGO_URI);

async function createSuperAdmin() {
  const exists = await User.findOne({
    email: "admin@ricx.com",
  });

  if (exists) {
    console.log("Super Admin already exists");
    process.exit();
  }

  const password = await bcrypt.hash("Admin@123", 10);

  await User.create({
    name: "Super Admin",
    email: "admin@ricx.com",
    password,
    role: "superAdmin",
  });

  console.log("Super Admin Created");
  process.exit();
}

createSuperAdmin();