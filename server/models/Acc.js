const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//实例化数据模板
const AccSchema = mongoose.Schema({
    acc:{
        type:String,
        require:true
    }
});

module.exports = Acc = mongoose.model("acc",AccSchema);