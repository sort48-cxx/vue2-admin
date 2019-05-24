<template>
  <div class="page-grid-bg">
    <admin-header></admin-header>
    <visitor-pie :pieData="pieData"></visitor-pie>
  </div>
</template>

<script>
import { getRequest } from "../util/http.js";
import adminHeader from "@/common/admin-header";
import visitorPie from  '@/common/visitorPie'
export default {
  data() {
    return {
      pieData: {}
    };
  },
  components: {
    adminHeader,
    visitorPie
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      getRequest("//elm.cangdu.org/v1/user/city/count")
        .then(res => {
		  this.pieData = res.data.user_city;
        })
        .catch(err => {
          console.log("请求失败");
        });
    }
  }
};
</script>

<style scoped>
</style>