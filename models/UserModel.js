const mongoose = require('mongoose')
const attributes = require('./attributes/user_attr')
const remap = require('./functions/user_func')

const { Schema } = mongoose

const UserSchema = new Schema({
  fullname: { type: String, upercase: true, index: true },
  ...attributes,
  password: { type: String, index: true, required: true },
  createdBy: { type: String, index: true, default: null },
  last_login: { type: Date, default: new Date().toISOString() },
  updatedBy: { type: String, index: true, default: null }
}, { timestamps: true })

UserSchema.methods.userList = () => {
  remap.list(this)
}
module.exports = mongoose.model('User', UserSchema)
