<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand" menu-align="start">
      <img src="../assets/default.jpg" class="avator">
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="signout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { postRequest, getRequest, deleteRequest } from "../util/http.js";
export default {
  date() {
    return {
      msg: "hello"
    };
  },
  created() {
    this.getAdminData();
  },
  methods: {
    ...mapActions(["getAdminData"]),
    /**
     * 公共方法-弹窗
     */
    showMessage(text) {
      this.$message({
        message: text,
        type: "warning"
      });
    },
    async handleCommand(command) {
      if (command == "home") {
        this.$router.push("/main");
      } else if (command == "signout") {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>