const express = require("express");
const cors = require("cors");
const {connection} = require("./dbConfig/config")
const {employeeRouter} = require("./routes/employee.routes");
const{userRouter}= require("./routes/user.routes")
const app = express();
app.use(cors());
app.use(express.json())
app.get("/", (req,res)=>{
res.send("Home")
})


app.use("/user",userRouter);
app.use("/employees", employeeRouter)


const PORT = 8000;

app.listen(PORT, async()=>{
    await connection;
    console.log("db is connected");
    console.log(`Listening on port ${PORT}`);
})