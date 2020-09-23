const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const koaBody = require('koa-body');
const cors = require('koa2-cors');

//引入model
const Noacc = require('../server/models/Noacc');
const Acc = require('../server/models/Acc')

//实例化koa
const app = new Koa();
const router = new Router();


app.use(koaBody({
    strict:false,//设为false
}));
app.use(cors());


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

//创建事项
router.post('/add',async(ctx)=>{
    // console.log(ctx.request.body)
    // const findResult = await Noacc.find({noacc:ctx.request.body.noacc});
    // console.log(findResult);
    const newNoacc = new Noacc({
        noacc:ctx.request.body.noacc,
        time:ctx.request.body.time
    });
    console.log(newNoacc)

    //存储到数据库
    await newNoacc.save().then(noacc=>{
        ctx.body = noacc;
    }).catch((err)=>{
        console.log(err)
    });

    //返回json数据
    ctx.body = newNoacc;
});

router.get('/noacclist',async(ctx)=>{
    const findResult = await Noacc.find({noaccs:ctx.request.body.noacc});
    // console.log(findResult)
    ctx.body = findResult
});

router.post('/del',async(ctx)=>{
    const id = (ctx.request.body)
    // console.log(id)
    const find = await Noacc.findByIdAndDelete({_id:ctx.request.body.id});
    // console.log(find)
    ctx.body = {
        msg:'ddd'
    }
});

router.post('/acc',async (ctx)=>{
    const newAcc = new Acc({
        acc:ctx.request.body.acc,
        time:ctx.request.body.time
    });
    // console.log(newAcc)

    // 存储到数据库
    await newAcc.save().then(acc=>{
        ctx.body = acc;
    }).catch((err)=>{
        console.log(err)
    });

    //返回json数据
    ctx.body = newAcc;
});

router.get('/acclist',async(ctx)=>{
    const findResult = await Acc.find({accs:ctx.request.body.acc});
    ctx.body = findResult
});

router.post('/ok',async(ctx)=>{
    // console.log(ctx.request.body.data)
    const txt = ctx.request.body.txt
    const time = ctx.request.body.time
    // console.log(ctx.request.body)
    const findResult = await Acc.find({accs:ctx.request.body.acc})
    // console.log(findResult)
    const newAcc = new Acc({
        acc:txt,
        time:time
    });
    // console.log(newAcc)

    // 存储到数据库
    await newAcc.save().then(acc=>{
        ctx.body = acc;
    }).catch((err)=>{
        console.log(err)
    });

    //返回json数据
    ctx.body = newAcc;
})

router.get('/remove',async(ctx)=>{
    await Acc.remove({accs:ctx.request.body.acc})
    ctx.body = {
        msg:'ok'
    }
})

//配置路由地址
// router.use('/api/add',Noacc);

//配置路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('ok');
})