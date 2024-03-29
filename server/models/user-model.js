const {Schema, model} = require('mongoose');

const userSchema = new Schema({
   email: {type: String, required: true, unique: true},
   password: {type: String, required: true},
   roles: [{type: String, default: 'DeliveryMan'}],
   name: {type: String, required: true},
   surname: {type: String, required: true}
});

module.exports = model('User', userSchema);