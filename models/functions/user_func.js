module.exports.list = async (this_) => ({
  id: this_._id,
  fullname: this_.fullname,
  username: this_.username,
  email: this_.email
})
