require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const User = require('./models/user')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
//routes
const homeRoutes = require('./routes/home')
const myFriends = require('./routes/myfriends')
const friendRoutes = require('./routes/friends')
const authRoutes = require('./routes/auth')
const followersRouters = require('./routes/followers')
//
const Handlebars = require('handlebars');
//middleware
const mid = require('./middleware/variables')
const userMid = require('./middleware/user')
//
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const app = express()

const PORT = process.env.PORT || 3000

const store = new MongoStore({
  collection: 'sessions',
  uri: process.env.MONGO
})
const hbs = exphbs.create({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  extname: 'hbs'
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use(session({
  secret: 'i dont know what to say here lol',
  resave: false,
  saveUninitialized: false,
  store : store
}))
app.use(mid)
app.use(userMid)
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

// app.use(async (req, res, next) => {
//   try {
//     const user = await User.findById('614f61608c3792154c1d641a')
//     req.user = user
//     next()
//   } catch (e) {
//     console.log(e)
//   }
// })

app.use('/', homeRoutes)
app.use('/friends', friendRoutes)
app.use('/myfriends', myFriends)
app.use('/auth', authRoutes)
app.use('/followers', followersRouters)


async function start() {
  
  try {
   
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
