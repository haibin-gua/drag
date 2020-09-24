<template>
<div>
  <div class="header">
    <span class="choose" @click="choose">
      <input type="text" readonly v-model="this.day">
    </span>
    <span class="mainBox">
    <Calendar v-if="isshow" class="today"
      :textTop="['S','M','T','W','T','F','S']"
      :sundayStart='true' v-on:choseDay="clickDay">
    </Calendar>
  </span>
    <form>
      <div class="input">
        <input type="text" placeholder="请输入待办事项" v-model="noacclist.noacc">
      </div>
      <div class="submit"><input type="submit" value="添加" @click="btn"></div>
    </form>
  </div>
  <div class="body">
    <div class="drag-box fl">
      <h2>待办事项</h2>
      <draggable chosen-class="chosen" class="dd" element="ul" v-model="listdata" group="{name:'people'}" animation='200'>
       <li v-for="item in listdata" :key="item._id" :id="item._id">{{item.noacc}}<img @click="ok" class="ok" src="../assets/images/完成.svg"/><img @click="del" class="close" src="../assets/images/close.svg"/></li>
      </draggable>
    </div>
    <div class="drag-box fr">
      <h2>完成事项<span class="remove" @click="remove">清除</span></h2>
      <draggable class="dd" element="ul" v-model="listdata2" group="{name:'people'}" animation='200' @change="toChange" filter=".item">
        <li class="item" v-for="item in listdata2" :key="item._id">{{item.acc}}</li>
      </draggable>
    </div>
  </div>
</div>
</template>
 
<script>
import draggable from 'vuedraggable'
import Calendar from 'vue-calendar-component';
import dayjs from 'dayjs'
export default {
  components: { 
    draggable,
    Calendar
  },
  data () {
    return {
       isshow:false,
       day:'',
      noacclist:{
        noacc:'',
        time:''
      },
      listdata:[],
      listdata2:[]
    }
  },
  methods:{
    btn(){
      var date = dayjs()                  //通过插件dayjs获取当前时间
      var year = String(date.$y);
      var month = String(date.$M+1);
      var day = String(date.$D);
      var time = year+'/'+month+'/'+day     //将年月日转为字符串组合到一起
      this.noacclist.time = time
      var regu = "^[ ]+$";        //正则，判断空格
      var re = new RegExp(regu);
      if(this.noacclist.noacc.length > 0 && re.test(this.noacclist.noacc) == false){
        this.$http.post('/add',this.noacclist).then(res=>{
        })
      }
      this.$http.get('/noacclist').then(res=>{
      this.listdata = res.data
      this.noacclist.noacc = ''
     
    })
    },
    del(){
      var id = event.path[1].id       //获取待办事项的id传给后端
      this.$http.post('/del',{id:id}).then(res=>{
        
        
      })
      this.$http.get('/noacclist').then(res=>{
      this.listdata = res.data
      
    })
    },
    ok(){
      var txt = event.path[1].innerText
      var id = event.path[1].id
      var date = dayjs()
      var year = String(date.$y);
      var month = String(date.$M+1);
      var day = String(date.$D);
      var time = year+'/'+month+'/'+day
      
      this.$http.post('/ok',{txt:txt,time:time}).then(res=>{
        console.log('ok')
      })
      
      this.$http.post('/del',{id:id}).then(res=>{
        
      })
      this.$http.get('/noacclist').then(res=>{
      this.listdata = res.data
      
    })
    this.$http.get('/acclist').then(res=>{
      this.listdata2 = res.data
      
    })
    },
    toChange(event){                //插件draggable提供的拖动完成的方法，拖动完成后获取拖动列表的信息
      console.log(event)
      var txt = event.added.element.noacc
      var id = event.added.element._id
      var time = event.added.element.time
      this.$http.post('/ok',{txt:txt,time:time}).then(res=>{
      })
      this.$http.post('/del',{id:id}).then(res=>{
        
      })
      this.$http.get('/noacclist').then(res=>{
      this.listdata = res.data
      
    })
    this.$http.get('/acclist').then(res=>{
      this.listdata2 = res.data
      
    })
    },
    remove(){
      this.$http.get('/remove').then(res=>{
        
      })
      this.$http.get('/acclist').then(res=>{
      this.listdata2 = res.data
      
    })
    },
    choose(){       //对日历进行显示与隐藏
      console.log()
      this.isshow = !this.isshow    
    },
    clickDay(data){         //插件dayjs提供的方法，点击获取当前时间
      var list = []
      var list2 = []
      this.day = data
      this.isshow = !this.isshow
      this.$http.get('/noacclist').then(res=>{
        for(var i = 0;i<res.data.length;i++){     //对待办事项的数据进行遍历，符合查询日期的渲染到页面
          if(res.data[i].time == data){
              list.push(res.data[i])
          }
         
          this.listdata = list
        }
    })
    this.$http.get('/acclist').then(res=>{
      for(var j = 0;j<res.data.length;j++){
        if(res.data[j].time == data){
          list2.push(res.data[j])
        }
        
        this.listdata2 = list2
      }
      
    })
    }
},
  mounted(){
    var date = dayjs()
      var year = String(date.$y);
      var month = String(date.$M+1);
      var day = String(date.$D);
      var time = year+'/'+month+'/'+day
      this.day = time;
      var list = [];
      var list2 = [];
      this.$http.get('/noacclist').then(res=>{
        for(var i = 0;i<res.data.length;i++){
          if(res.data[i].time == time){
              list.push(res.data[i])
          }
          
          this.listdata = list
        }
    })
    this.$http.get('/acclist').then(res=>{
      for(var j = 0;j<res.data.length;j++){
        if(res.data[j].time == time){
          list2.push(res.data[j])
        }
        
        this.listdata2 = list2
      }
      
    })
    
  }
}
</script>


<style scoped>
  .header{
    height:50px;
    background: pink;
    text-align: right;
    padding-right: 150px;
    position: relative;
  }
  .header .input{
    width:150px;
    height: 30px;
    display: inline-block;
    margin-top:10px;
    overflow: hidden;
    border-radius: 10px;
  }
  .header .input input{
    width:100%;
    height: 100%;
    padding-left:10px;
    font-size: 16px;
    color: #333;
  }
  .header .submit{
    width:50px;
    height: 30px;
    margin-top:10px;
    display: inline-block;
    overflow: hidden;
    border-radius: 10px;
     margin-left:20px;
  }
  .header .submit input{
    width:100%;
    height: 100%;
    border:none;
    background: yellow;
    cursor: pointer;
  }
  .body{
        padding:0 20px;
  }
  .body .dd{
    /* display: inline-block; */
    /* margin:0 80px; */
    /* width:250px; */
    border:1px solid #333;
    background: #ffffff;
  }
  .body .dd li{
    cursor: pointer;
  }
  .body .drag-box{
    width:45%;
    display: inline-block;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .body .drag-box h2{
    font-size: 28px;
    height: 40px;
    line-height: 40px;
    color: #333333;
    font-weight: bold;
    text-align: center;
    background: gray;
    position: relative;
  }
    .body .dd li{
      border-bottom: 1px solid #333;
      padding:5px;
      font-size: 18px;
      padding-right: 20px;
    }
    .body .dd li:hover{
      background-color: #f1f1f1;
      cursor: move;
    }
    .chosen {
            border: solid 2px green !important;
        }
    .body .dd:last-child li:hover{
      cursor: pointer;
    }
    .body .dd li:last-child{
      border-bottom: none;
    }
    img.close{
      float: right;
      margin-right: 20px;
    }
    img.ok{
      float: right;
    }
    .remove{
      display: inline-block;
      position: absolute;
      width:50px;
      height: 35px;
      top:3px;
      right: 30px;
      border-radius: 20px;
      line-height: 35px;
      background: yellow;
      font-size: 18px;
      color: #333;
      cursor: pointer;
    }
    .today{
      position: absolute;
      z-index: 999;
      left:20px;
      top:50px;
    }
    .choose{
      display: block;
      float: left;
      width:180px;
      height: 30px;
      margin-top:10px;
      margin-left:50px;
     
    }
    .choose input{
      width:100%;
      height: 100%;
       padding-left:10px;
       border-radius: 10px;
    }
</style>
