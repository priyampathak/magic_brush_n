const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user_id: String,
    address_line: String,
    street: String,
    house_no: String,
    building_no: String,
    building_name: String,
    latitude: String,
    longitude: String,
    city: String,
    state: String,
    country: String,
    created_at: String,
    updated_at: String,
    default_address_status: String
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;