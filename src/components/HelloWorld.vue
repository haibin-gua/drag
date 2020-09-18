<template>
<div>
  <div class="header">
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
      <draggable class="dd" element="ul" v-model="listdata" group="{name:'people'}" animation='200'>
        <li v-for="item in listdata" :key="item.id">{{item.noacc}}</li>
      </draggable>
    </div>
    <div class="drag-box fr">
      <h2>完成事项</h2>
      <draggable class="dd" element="ul" v-model="listdata2" group="{name:'people'}" animation='200'>
        <li v-for="item in listdata2" :key="item.id">{{item.noacc}}</li>
      </draggable>
    </div>
    <!-- <draggable class="dd" element="ul" v-model="listdata" group="people">
      <h2>代办事项</h2>
      <li v-for="item in listdata" :key="item.id">{{item.name}}</li>
    </draggable>   -->
  </div>
</div>
  <!-- <div> -->
    <!-- 调用组件  -->
    <!-- <draggable class="dd" element="ul" v-model="listdata" group="people">
      <li v-for="item in listdata" :key="item.id">{{item.name}}</li>
    </draggable>
    <draggable element="ul" v-model="listdata2" group="people">
      <li v-for="item in listdata2" :key="item.id">{{item.name}}</li>
    </draggable> -->
    <!-- 展示list数据效果 -->
    <!-- {{listdata}} -->
  <!-- </div> -->
</template>
 
<script>
import draggable from 'vuedraggable'
export default {
  name: 'draggabletest',
  components: { 
    draggable,
  },
  data () {
    return {
      noacclist:{
        noacc:''
      },
      listdata:[],
      listdata2:[]
    }
  },
  methods:{
    btn(){
      if(this.noacclist.noacc.length > 0){
        this.$http.post('/add',this.noacclist).then(res=>{
          // console.log(res)
        })
      }
      this.$http.get('/noacclist').then(res=>{
      this.listdata = res.data
      this.noacclist.noacc = ''
      // console.log(res.data)
    })
    }
},
  mounted(){
    this.$http.get('/noacclist').then(res=>{
      this.listdata = res.data
      // console.log(res.data)
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
  }
    .body .dd li{
      border-bottom: 1px solid #333;
      padding:5px;
      font-size: 18px;
    }
    .body .dd li:last-child{
      border-bottom: none;
    }
</style>
