import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./config/db.js";   // don’t forget `.js` if using ES modules
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello bubaipp");
});

// Sync DB and start server
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("✅ Server is running on port: 3000");
    });
  })
  .catch(() => {
    console.log("❌ Issue in database connection!");
  });
