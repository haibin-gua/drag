const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const koaBody = require('koa-body');
const cors = require('koa2-cors');

//引入model
const Noacc = require('../server/models/Noacc');  //待办事项模板
const Acc = require('../server/models/Acc')   //完成事项

//实例化koa
const app = new Koa();
const router = new Router();


app.use(koaBody({
    strict:false,//设为false
}));
app.use(cors());  //跨域


// 路由
router.get('/test',(ctx)=>{
    ctx.body = {
        msg:'lala'
    }
});


//连接数据库
mongoose.connect('mongodb://localhost:27017/todo',{
    useNewUrlParser:true,
    useFindAndModify:true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('ok')
}).catch((err)=>{
    console.log(err)
})

//创建待办事项
router.post('/add',async(ctx)=>{
    const newNoacc = new Noacc({
        noacc:ctx.request.body.noacc,
        time:ctx.request.body.time
    });

    //存储到数据库
    await newNoacc.save().then(noacc=>{
        ctx.body = noacc;
    }).catch((err)=>{
        console.log(err)
    });

    //返回json数据
    ctx.body = newNoacc;
});

//获取待办事项
router.get('/noacclist',async(ctx)=>{
    const findResult = await Noacc.find({noaccs:ctx.request.body.noacc});
    ctx.body = findResult
});

//删除待办事项
router.post('/del',async(ctx)=>{
    const id = (ctx.request.body)
    const find = await Noacc.findByIdAndDelete({_id:ctx.request.body.id});
    ctx.body = {
        msg:'ok'
    }
});

//获取客户端传过来的信息传入到数据库
router.post('/acc',async (ctx)=>{
    const newAcc = new Acc({
        acc:ctx.request.body.acc,
        time:ctx.request.body.time
    });

    // 存储到数据库
    await newAcc.save().then(acc=>{
        ctx.body = acc;
    }).catch((err)=>{
        console.log(err)
    });

    //返回json数据
    ctx.body = newAcc;
});

//获取完成事项
router.get('/acclist',async(ctx)=>{
    const findResult = await Acc.find({accs:ctx.request.body.acc});
    ctx.body = findResult
});

//将代办事项传到完成事项
router.post('/ok',async(ctx)=>{
    const txt = ctx.request.body.txt
    const time = ctx.request.body.time
    const findResult = await Acc.find({accs:ctx.request.body.acc})
    const newAcc = new Acc({
        acc:txt,
        time:time
    });

    // 存储到数据库
    await newAcc.save().then(acc=>{
        ctx.body = acc;
    }).catch((err)=>{
        console.log(err)
    });

    //返回json数据
    ctx.body = newAcc;
})

//清除所有完成事项
router.get('/remove',async(ctx)=>{
    await Acc.remove({accs:ctx.request.body.acc})
    ctx.body = {
        msg:'ok'
    }
})


//配置路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('ok');
})