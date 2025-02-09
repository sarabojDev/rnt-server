const bcrypt = require("bcrypt")


exports.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err)
            }
            bcrypt.hash(password, salt,(err,hash)=>{
                if(err){
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

exports.comparePassword = (password,hashedPassword)=>{
  return bcrypt.compare(password,hashedPassword)
}