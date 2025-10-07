import { Sequelize } from "sequelize";

const sequelize = new Sequelize("mern_mysql", "root", "Shubhrajit@123", {
  host: "localhost",
  dialect: "mysql",
});

try {
  await sequelize.authenticate();
  console.log("MySql connected successfully..");
} catch (error) {
  console.error("Unable to connect!!!: ", error);
}

export default sequelize
