import { sequelize } from "../src/config/database";
import User from "../src/models/User";
import bcrypt from "bcryptjs";

async function createAdminUser() {
  try {
    await sequelize.sync();

    const adminEmail = "admin@example.com";
    const adminPassword = "adminpassword"; // You should use a strong password in production

    const existingAdmin = await User.findOne({ where: { email: adminEmail } });

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = await User.create({
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
      canEdit: true,
      canDelete: true,
      canViewAll: true,
    });

    console.log("Admin user created successfully:", adminUser.toJSON());
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await sequelize.close();
  }
}

createAdminUser();
