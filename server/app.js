const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

//引入Bbs
const Noacc = require('../server/models/Noacc');

//实例化koa
const app = new Koa();
const router = new Router();


app.use(bodyParser());
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
        noacc:ctx.request.body.noacc
    });
    // console.log(newNoacc)

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

router.delete('/del/:id',async(ctx)=>{
    const findResult = await Noacc.findByIdAndDelete({noaccs:ctx.request.body.id});
    console.log(findResult)
})

//配置路由地址
// router.use('/api/add',Noacc);

//配置路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('ok');
})