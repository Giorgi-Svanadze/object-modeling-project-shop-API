const express = require("express");
const connectDatabase = require("./database");

const customerRoutes = require("./routes/customerRoutes");
const loyaltyCardRoutes = require("./routes/loyaltyCardRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const stockRoutes = require("./routes/stockRoutes");
const supplyRoutes = require("./routes/supplyRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const deliveryAgentRoutes = require("./routes/deliveryAgentRoutes");
const stockManagerRoutes = require("./routes/stockManagerRoutes");

const app = express();
app.use(express.json());

connectDatabase();

app.use("/customers", customerRoutes);
app.use("/loyalty-cards", loyaltyCardRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);
app.use("/stocks", stockRoutes);
app.use("/supplies", supplyRoutes);
app.use("/complaints", complaintRoutes);
app.use("/deliveries", deliveryRoutes);
app.use("/delivery-agents", deliveryAgentRoutes);
app.use("/stock-managers", stockManagerRoutes);

app.get("/", (req, res) => {
    res.send("API is operational (i hope...)!");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
