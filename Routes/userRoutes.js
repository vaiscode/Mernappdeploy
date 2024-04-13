const express = require('express');
const router = express.Router();
const users = require('../Model/user');
const jwt = require ('jsonwebtoken');

router.use(express.json());


//add user

// router.post('/',async(req,res)=>{
//     try {
//         const data  = req.body;
//         let newUser = await users(data).save();
//         console.log(newUser);
//         res.status(200).send({message:'Data added'})
//     } catch (error) {
//         console.log(error);
//     }
// })


//login

router.post('/login',async(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    const user = await users.findOne({username:username});
    if(!user){
        res.json({message:'Employee not found'});
    }
    try {
        if(user.password==password){
            let payload = {username:username,password:password}
            let token = jwt.sign(payload,'userkey');
            res.send({message:'Logged In',token:token});
        }
        else{
            res.json({message:'Invalid username/password'});
        }
    } catch (error) {
        
    }
})

module.exports = router;