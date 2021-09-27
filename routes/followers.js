const {Router} = require('express')
const User = require('../models/user')
const router = Router()
const auth = require('../middleware/auth')



router.get('/', async (req, res) => {
  const users = await User.findById(req.session.user._id)
  res.render('followers', {
    title: 'Мои Друзья',
    myFollowers: true,
    users
  })
})

module.exports = router