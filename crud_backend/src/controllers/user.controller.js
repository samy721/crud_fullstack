const express = require('express');
const router = express.Router()

const User = require('../models/user.model')

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

function search(e){
const regex = new RegExp(escapeRegex(e), 'gi');
return regex
}

router.get("/", async(req,res) =>{
   
       try{ 
    

        const page = +req.query.page || 1;
        const size = +req.query.size || 10;
    
        const sorting = req.query.sort || "name";
        const order = req.query.order ? req.query.order === "asc" ? 1 : -1 : 1 ;
        const name = req.query.name ? req.query.name !== "" ? search(req.query.name) : false : false;
        const gender = req.query.gender ? req.query.gender !== "" ? req.query.gender : false : false;
        const age = req.query.age ? req.query.age !== "" ? {$gt:Number(req.query.age)} : false : false;
        const city = req.query.city ? req.query.city !== "" ? search(req.query.city) : false : false;
        const queries = {
            name,
            gender,
            age,
            city
        }

        for(q in queries){
            if(!queries[q]){
                delete queries[q]
            }
        }

    
        const offset = (page - 1) * size;
    
        const users = await User.find(queries).skip(offset).sort({[sorting]: order}).limit(size).lean().exec()
    
        const totalDocuments = await User.find(queries).countDocuments().lean().exec()
    
        const totalPages = Math.ceil(totalDocuments/size)

    
        return res.status(200).send({users,totalPages})
    
    }catch(err){
    
        return res.status(500).send("please try again later")
    
    }
});

router.post("/", async(req,res) => {

    try{
      
        const user = await User.create(req.body)
        return res.status(200).send(user)

    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.get("/:id", async(req,res) => {

    try{
      
        const user = await User.findById(req.params.id).lean().exec()
        return res.status(200).send(user)

    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.patch("/:id", async(req,res) => {

    try{
      
        const user = await User.findById(req.params.id).updateOne(req.body).lean().exec()
        return res.status(200).send(user)

    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.delete("/:id", async(req,res) => {

    try{

        const user = await User.findByIdAndDelete(req.params.id)
        return res.status(200).send(user)

    }catch(err){
        return res.status(500).send(err.message)
    }
})

module.exports = router

