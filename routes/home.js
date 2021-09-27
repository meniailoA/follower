const {Router} = require('express')
const User = require('../models/user')
const router = Router()

router.get('/', async (req, res) => {
  const users = await User.find()
  const user = await User.findById(req.session.user._id)
  res.render('index', {
    title: 'Главная страница',
    isHome: true,
    users,
    user
  })
})


module.exports = router