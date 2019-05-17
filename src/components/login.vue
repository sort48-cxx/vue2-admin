<template>
  <div class="l-box">
    <el-main>
      <el-row type="flex" justify="center" align="middle" class="row-h">
        <el-col :span="24">
          <div class="t-c">欢迎您，登录后台</div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="middle" class="mb-20">
        <el-col :span="1" class="c-fff font-16">用户名：</el-col>
        <el-col :span="5">
          <el-input placeholder="请输入用户名" v-model.trim="lName"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="middle" class="mb-20">
        <el-col :span="1" class="c-fff font-16">密码：</el-col>
        <el-col :span="5">
          <el-input show-password placeholder="请输入密码" v-model.trim="lPsw"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="middle">
        <el-button class="w-324 font-16" type="danger" @click="submit">主要按钮</el-button>
      </el-row>
    </el-main>
  </div>
</template>


<script>
export default {
  name: "Login",
  data() {
    return {
      lName: "",
      lPsw: ""
    };
  },
  methods: {
	  /**
	   * 公共方法-弹窗
	   */
    showMessage(text) {
      this.$message({
        message: text,
        type: "warning"
      });
    },
    submit: function() {
		if(this.lName.length==0){
			this.showMessage("请输入用户名");
			return;
		}
		if(this.lPsw.length==0){
			this.showMessage("请输入密码");
			return;
		}
		if(this.lName==='admin'&&this.lPsw==="123456"){
			this.showMessage("登录成功！");
			this.$router.push('/main');
		}
    }
  }
};
</script>


<style scoped>
.l-box {
  position: fixed;
  background-color: #409eff;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.row-h {
  height: 270px;
  overflow: hidden;
  font-size: 30px;
  color: #fff;
}
.w-324 {
  width: 324px;
  overflow: hidden;
  margin-left: 65px;
}
</style>