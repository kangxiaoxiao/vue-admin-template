<template>
  <div class="option1_1">
      <h4>canvas绘制图片并下载到本地</h4>
      <div class="canvas_wrapper">
        <canvas id="canvas1" width="180px" height="180px"></canvas>
        <br /><br />
        <input type="button" value="保存png图片" id="btn1"  @click="download('png')"/>
        <input type="button" value="保存jpg图片" id="btn2" @click="download('jpg')"/>
      </div>
  </div>
</template>

<script>
import backgroundImg from "@/assets/images/user_img.jpeg";
export default {
  name: 'option1_1',
  data () {
    return{

    }
  },
  mounted:function(){
    let _this=this;
    _this.$nextTick(function(){
        _this.init()
    })
  },
  methods:{
    init:function(){
      let _this=this;
      //绘制图片
      let canvas = document.getElementById('canvas1');
      let ctx = canvas.getContext('2d');
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "red";

      //将图片画在画布上
      let image = new Image();
      image.src = backgroundImg;
      image.onload = function() {
        ctx.drawImage(image, 0, 0, 180, 180);

        ctx.font = 'italic bold 15px Helvetica ';
        ctx.fillText('点点', 20, 20);

      }

    },
    //图片下载操作,指定图片类型
    download:function (type) {
       let _this=this;
       var canvas = document.getElementById('canvas1');
        //设置保存图片的类型
        var imgdata = canvas.toDataURL(type);
        //将mime-type改为image/octet-stream,强制让浏览器下载
        var fixtype = function (type) {
          type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
          var r = type.match(/png|jpeg|bmp|gif/)[0];
          return 'image/' + r;
        }
        imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
       //定义保存的图片名称
        var filename = new Date().toLocaleDateString() + '.' + type;
        _this.saveFile(imgdata, filename);
    },
    //将图片保存到本地
    saveFile:function (data, filename) {
      var link = document.createElement('a');
      link.href = data;
      link.download = filename;
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      link.dispatchEvent(event);
    }



  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
