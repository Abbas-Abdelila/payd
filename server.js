const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const port = process.env.PORT || 5000;
mongoose.set('strictQuery', false);


dotenv.config()


// Routes
const categoryRoute = require("./routes/categories.js")
const productRoute = require("./routes/products.js")
const billRoute = require("./routes/bills.js")
const authRoute = require("./routes/auth.js")
const userRoute = require("./routes/users.js")



const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error)
    }
}

// Middlewares
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5000", "https://payd-pos-web-app-api.onrender.com"]
}))
app.use(logger("common"))

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/bills", billRoute);
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)


connect().then(app.listen(port, () => {
    
    console.log(`Your app listening on port ${port}`);
}))