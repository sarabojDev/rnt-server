const mongoose = require("mongoose")

const colors = require("colors")

const connectDB = async()=>{
    try{
      await  mongoose.connect(process.env.DATABASE_LOCAL_URL)
      console.log(`Database connected ${mongoose.connection.host}`.bgYellow.white)

    }catch(errro){
      console.log(`error in Database connetion ${errro.message}`.bgRed.white)
    }
}

module.exports = connectDB