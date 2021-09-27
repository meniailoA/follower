
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        default: Date.now
    },
    info: {
        following: [
            {
                user:{ 
                    type: Schema.Types.ObjectId, 
                    ref: 'User',
                },
                name: {
                    type: String, 
                    ref: 'User',
                },
                email: {
                    type:String,
                    required:true
                }
            }
        ],
        followers: [
            {
                user: { 
                    type: Schema.Types.ObjectId, 
                    ref: 'User'
                    
                },
                name: {
                    type: String, 
                    ref: 'User',
                },
                email: {
                    type:String,
                    required:true
                }
            }
        ]
    }
    

});

UserSchema.methods.addToFollower = function (users) {
    
    const following = [...this.info.following]
    const followers = [...users.info.followers]

    if(users.id.toString() != this.id.toString()){
        
        const idx = following.findIndex(c => {
          return c._id.toString() === users._id.toString()
        })
        const ivx = followers.findIndex(c => {
            return c._id.toString() === this._id.toString()
          })
        if (idx >= 0 || ivx >= 0) {
         console.log('Уже есть')
        } else {
          following.push({
            _id: users._id,
            name: users.name,
            email: users.email
          })
          followers.push({
            _id: this._id,
            name: this.name,
            email: this.email
          })
        }
        this.info = {following:following,followers:this.info.followers}
        users.info = {following:users.info.following, followers:followers}
        // this.info = {following:following , followers: []}
        // users.info = {following:[] ,followers:followers}
        users.save()
        return this.save()
    }else{
        console.log('нельзя добавить самого себя')
    } 
}
UserSchema.methods.removeFollower = function(users) {

    let following = [...this.info.following]
    let followers = [...users.info.followers]
     const idx = following.findIndex(c => {
          return c._id.toString() === users._id.toString()
        })
        const ivx = followers.findIndex(c => {
            return users._id.toString() === c._id.toString()
          })
  
    if (idx >= 0 || ivx >= 0) {
        following = following.filter(c => c._id.toString() !== users._id.toString())
        followers = followers.filter(c => c._id.toString() !== this._id.toString())
    } else {
      console.log('Такого нет')
    }
    this.info = {following:following,followers:this.info.followers}
    users.info = {following:users.info.following, followers:followers}
    users.save()
    return this.save()
  }

  
module.exports = mongoose.model("User", UserSchema);