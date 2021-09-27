const {Router} = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = Router()

router.get('/',auth, async (req, res) => {
  const users = await User.find()
  const user = await User.findById(req.session.user._id)
  res.render('index', {
    isHome: true,
    users,
    user
  })
})


module.exports = router