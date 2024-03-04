const Address = require("../models/addresses")
const bcrypt = require('bcrypt')
require('dotenv').config({ path: '.env.local' });

const addressController = {
    getAddresses: async (req, res)=>{
        try{
            const addresses = await Address.find()
            res.json(addresses)
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Internal server error'})
        }
    },
}

module.exports = addressController;