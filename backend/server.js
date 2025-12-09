
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Simple API endpoints
app.get("/", (req,res) => res.json({ status:"OK", service:"Edible Farms API" }));

app.post("/api/order", (req,res)=>{
  console.log("New Order:", req.body);
  res.json({ success:true, message:"Order received!" });
});

app.post("/api/inquiry", (req,res)=>{
  console.log("New Inquiry:", req.body);
  res.json({ success:true, message:"Inquiry submitted!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log("API running on port", PORT));
