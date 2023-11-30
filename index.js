const express = require("express");
const connect = require("./utils/db");
const productRouter = require("./routers/product");
const userRouter = require("./routers/user");
const categoryRouter = require("./routers/category");
const customerRouter = require("./routers/customer");
const orderRouter = require("./routers/order");
const expenseRouter = require("./routers/expense");
const userControllers = require("./controllers/user");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;




app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/expenses", expenseRouter);


app.listen(PORT, async () => {
  await connect();
  console.log(`Server running on port ${PORT}`);
});
