module.exports = function (users) {
  
    let array = []
    let result = []
    let ind
      users.forEach(function (s)
      {
        if(s.info.followers.length && s.info.following.length ){
        array.push(s.info.followers)
    
        result = array.reduce((acc, curr) => acc.length > curr.length ? acc : curr);
        if(s.info.followers == result){
            ind = s.name
        }
        }
      })
      return ind
 
}
