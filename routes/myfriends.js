const {Router} = require('express')
const User = require('../models/user')
const router = Router()
const auth = require('../middleware/auth')



router.get('/', async (req, res) => {
  const users = await User.findById(req.session.user._id)
  res.render('myfriend', {
    title: 'Мои Друзья',
    myFriends: true,
    users
  })
})
router.post('/remove', async (req, res) => {
  const user = await User.findOne({_id : req.body.id})
  console.log(req.body.id)
  await req.user.removeFollower(user)
  res.redirect('/friends')
})
module.exports = router