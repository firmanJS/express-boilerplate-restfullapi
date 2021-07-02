const customUniqueMessage = (error, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error(`${JSON.stringify(error.keyValue)} must be unique`))
  } else {
    next(error)
  }
}

module.exports = {
  customUniqueMessage
}
