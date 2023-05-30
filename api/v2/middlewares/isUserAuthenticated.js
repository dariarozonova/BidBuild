const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  let authorizationHeader = req.get('Authorization')
  if (!authorizationHeader) {
    return res.status(403).send({ message: 'Nav autorizēts' })
  }
  const token = authorizationHeader.split(' ')[1]
  if (!token) {
    return res.status(403).send({ message: 'Nav autorizēts' })
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY, (error, decodedJWTToken) => {

      if (error || !decodedJWTToken) {
        return res.status(401).send({ message: 'Nav autorizēts' })
      }

      if (!decodedJWTToken.email) {
        return res.status(401).json({ message: 'Lietotājs netika atrasts.' })
      }

      req.user = decodedJWTToken.email

      next()
    })
  } catch (error) {
    console.log(error)
  }
}
