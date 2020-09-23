const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//实例化数据模板
const NoaccSchema = mongoose.Schema({
    noacc:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    }
});

module.exports = Noacc = mongoose.model("noacc",NoaccSchema);