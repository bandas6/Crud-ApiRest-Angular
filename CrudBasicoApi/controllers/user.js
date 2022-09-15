const { response } = require('express');
const Users = require('../models/user')


const getUsers =  async( req , res = response)=>{

    const users = await Users.find();

    res.json({
        users
    })

}


const postUsers =async ( req, res = response)=>{
    
    const { ...data } = req.body;

    console.log(data)

    const UsuarioDB = new Users(data);

    if(!UsuarioDB.nombre){
        return res.status(400).json({
            msg: 'no date'
        })
    }


    await UsuarioDB.save();

    res.json({
        UsuarioDB
    })
}


const putUsers =async (req , res = response)=>{
    const { id } = req.params;
    const {...resto} = req.body;

    const updateUser = await Users.findByIdAndUpdate(id,resto)

    res.json({
        updateUser
    })
}



const deleteUsers = async (req, res = response)=>{
    const { id } = req.params;

    const userDeleted = await Users.findByIdAndDelete(id);

    res.json({
        userDeleted
    })
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}