require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const connectDB = require("./utils/db");

const app = express();
const port = process.env.PORT || 4000;

// ✅ Allowed Origins
const allowedOrigins = [
  "http://localhost:3000",  // Local frontend (React)
  "http://localhost:5173",  // Local frontend (Vite)
  "https://admin.zemalt.com", // Admin panel (Live)
  "https://zemalt.com",
  "https://www.zemalt.com" ,
  "http://localhost:3001",      // Main Website (Live)
];

// ✅ Apply CORS Middleware Before Routes
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true, // Allow cookies/auth headers
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}));

app.options("*", cors());  

app.use(express.json());


const adminRoutes = require("./Routes/adminRoutes");

app.use("/admin", adminRoutes);
        

// ✅ Static Folder for Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Database Connection & Server Start
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server is running on Port: ${port}`);
  });
});
