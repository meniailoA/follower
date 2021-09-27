const {Router} = require('express')
const User = require('../models/user')
const router = Router()
const auth = require('../middleware/auth')
router.get('/login', async (req, res) => {
  res.render('auth/login', {
    isLogin: true
  })
})
router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login')
  })
  
})

router.post('/login', async (req,res) =>{
  // const user = await User.findById('614f61608c3792154c1d641a')
  // req.session.user = user
  // req.session.isAuthenticated = true
  // req.session.save(err=>{
  //   if(err){
  //     throw err
  //   }res.redirect('/')
  // })


  try {
    const {email, password} = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      const areSame = password === candidate.password

      if (areSame) {
        req.session.user = candidate
        req.session.isAuthenticated = true
        req.session.save(err => {
          if (err) {
            throw err
          }
          res.redirect('/')
        })
      } else {
        res.redirect('/auth/login')
      }
    } else {
    //   for(let i = 0 ; i < 100; i++){
    //     let randomString = Math.random().toString(36).substring(7);
    //     const user = new User({
    //         email: `${randomString}@gmail.com`,
    //         name: `${randomString}`,
    //         password: 12345,
    //         info: {
    //             following: [],
    //             followers: []
    //         }
    //       })
    //       await user.save()
    // }
    res.redirect('/auth/login')
    }
  }catch (e) {
    console.log(e)
  }
})



module.exports = router