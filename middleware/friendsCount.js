module.exports = function (users) {
  
 let array = []
    users.forEach( function (s)
    {
      // let count = 0;
      if(s.info.following.length && s.info.followers.length ){
      let result = s.info.following.filter(function(v) {
        return s.info.followers.some(v2 => v.name == v2.name && v.email == v2.email)});
        array.push(result)
      }
  });
    
  return array
  }