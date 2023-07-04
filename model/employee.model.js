const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    firstname :{type:String, required:true },
    lastname:{type:String, required:true},
    email:{type:String, required:true },
    department:{type:String, required:true,enum:["Tech","Marketing","Operations"]},
    salary:{type:Number, required:true}
})




const Employeemodel = mongoose.model("employee", employeeSchema);

module.exports = {Employeemodel}

// 