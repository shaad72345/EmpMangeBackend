const {Router} = require("express");
// const cors = require("cors")
const {authenticate} = require("../middleware/authentacation");
const {Employeemodel} = require("../model/employee.model")
const employeeRouter = Router();

// employeeRouter.use(cors());
employeeRouter.get("/", authenticate,async(req,res)=>{

        const employees = await Employeemodel.find({})
        if(employees){
            res.send({allEmployees:employees})
            }
            else{
               res.send({msg:"No todo found"})
            }
    
     
    
})


employeeRouter.post("/create", authenticate, async(req,res)=>{

   const {firstname, lastname,email,department,salary}  = req.body
    
    const employee = new Employeemodel({
        firstname,
        lastname,
        email,
        department,
        salary
    })

    try {
        await employee.save();
        res.send({msg:"Employee added successfully"})
    } catch (error) {
        res.send({err:error.message})
    }
})

employeeRouter.patch("/update/:id",authenticate,async(req,res)=>{
      const {id} = req.params;
      const updateEmployee = await Employeemodel.findOneAndUpdate({_id:id},{...req.body});
      if(updateEmployee){
        res.send({msg:"update Successful"})
      }
      else{
        res.send({msg:"Something went wrong"})
      }
})

employeeRouter.delete("/delete/:id",authenticate,async(req,res)=>{
    const {id} = req.params;
    const deleteEmployee = await Employeemodel.findOneAndDelete({_id:id});
    if(deleteEmployee){
      res.send({msg:"deleted Successfully"})
    }
    else{
      res.send({msg:"Something went wrong"})
    }
})







module.exports ={employeeRouter}