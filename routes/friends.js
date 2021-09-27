const {Router} = require('express')
const User = require('../models/user')
const router = Router()
const auth = require('../middleware/auth')
const findFriends = require('../middleware/friendsCount')
const famousFind = require('../middleware/famous')
router.get('/', async (req, res) => {
  const users = await User.find()
  let friends = findFriends(users)
  let famous = famousFind(users)
  console.log(famous)
  res.render('friends', {
    title: 'Друзья',
    isFriends: true,
    users,
    friends,
    famous
  })
})

router.post('/add' , async (req,res)=> {
  const user = await User.findOne({_id : req.body.id})
  console.log(req.body.id)
  await req.user.addToFollower(user)
  res.redirect('/myfriends')
})

module.exports = router