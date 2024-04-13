const express = require('express');
const router = express.Router();
const jwt = require ('jsonwebtoken');
const employees = require('../Model/employees');

router.use(express.json());

function verifytoken(req,res,next){
  const token = req.headers.token;
  try {
    if(!token) throw 'Unauthorized access';
    let payload = jwt.verify(token,'userkey');
    if(!payload) throw 'Unauthorized access';
    next()
  } catch (error) {
    res.status(404).send('error')
  }
}

//add employee

router.post('/add',verifytoken,async(req,res)=>{
    try {
        const employee = req.body;
        const data  = await employees(employee).save();
        res.status(200).send({message:'Employee details added'})
    } catch (error) {
        console.log(error);
    }
})

//view

router.get('/home',verifytoken,async(req,res)=>{
    try {
         const data = await employees.find();
         res.status(200).send({message:"data send",data});
         console.log(data);
    } catch (error) {
      console.log(error);
    }
  })
  

  //update

  router.put('/edit/:id',verifytoken,async(req,res)=>{
    try {
      const employee = req.body;
    const data = await employees.findByIdAndUpdate(req.params.id,employee);
    res.status(200).send({message:'Employee details Updated'});
    } catch (error) {
      console.log(error);
    }
  })

  //delete

  router.delete('/delete/:id',verifytoken,async(req,res)=>{
    try {
      const employee = req.body;
    const data = await employees.findByIdAndDelete(req.params.id,employee);
    res.status(200).send({message:'Employee details Removed'});
    } catch (error) {
      console.log(error);
    }
  })

module.exports = router;