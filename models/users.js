const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    mobile_no: String,
    password: String,
    mobile_verify_code: String,
    mobile_verify_status: String,
    mobile_verify_time: String,
    email_verify_status: String,
    active_status: String,
    delete_status: String,
    create_at: String,
    update_at: String,
    remark: String,
    user_role_id: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;