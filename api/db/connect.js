const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser : true,
  useUnifiedTopology : true,
}).then(console.log("connected to mongodb")).catch((err)=>console.log(err));