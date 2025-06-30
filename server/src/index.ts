import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import dashboardRoutes from "./routes/dashboardRoutes";
import productsRoutes from "./routes/productsRoutes";
import userRoutes from "./routes/userRoutes";
import expensesRoutes from "./routes/expenseRoutes";

// Router imports

// config
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/dashboard", dashboardRoutes);
app.use("/products", productsRoutes);
app.use("/users", userRoutes);
app.use("/expenses", expensesRoutes);

// SERVER
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
