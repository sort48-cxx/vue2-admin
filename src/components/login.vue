<template>
  <div class="l-box">
    <el-main>
      <el-row type="flex" justify="center" align="middle" class="row-h">
        <el-col :span="24">
          <div class="t-c">欢迎您，登录后台</div>
        </el-col>
      </el-row>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="90px" class="form">
        <el-form-item label="用户名：" prop="lName" class="form-label">
          <el-input placeholder="请输入用户名" v-model.trim="loginForm.lName"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="lPsw" class="form-label">
          <el-input type="password" placeholder="请输入密码" v-model.trim="loginForm.lPsw"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-324 font-16" type="danger" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>


<script>
import { postRequest } from "../util/http.js";
export default {
  name: "Login",
  data() {
    var validateName = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePsw = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        lName: "",
        lPsw: ""
      },
      rules: {
        //lName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        //lPsw: [{ required: true, message: "请输入密码", trigger: "blur" }]
        lName: [{ validator: validateName, trigger: "blur" }],
        lPsw: [{ validator: validatePsw, trigger: "blur" }]
      }
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postRequest("//elm.cangdu.org/admin/login", {
            user_name: this.loginForm.lName,
            password: this.loginForm.lPsw
          })
            .then(res => {
              if (res.data.status == 1) {
                this.showMessage("登录成功！");
                this.$router.push("/main");
              } else {
                this.showMessage(res.data.message);
              }
            })
            .catch(err => {
			   this.showMessage(err);
            });
        } else {
          this.showMessage("请输入正确的用户名密码");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.form {
  width: 410px;
  margin: 0 auto;
}
.form-label {
  color: #fff;
  font-size: 16px;
}
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
}
</style>