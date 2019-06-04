<template>
  <div>
    <admin-header></admin-header>
    <div class="data_section">
      <div class="section_title">数据统计</div>
      <el-row :gutter="20" style="margin-bottom: 10px;">
        <el-col :span="4">
          <div class="data_list today_head">
            <span class="data_num head">当日数据：</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">
            <span class="data_num">{{userCount}}</span> 新增用户
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">
            <span class="data_num">{{orderCount}}</span> 新增订单
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">
            <span class="data_num">{{adminCount}}</span> 新增管理员
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="data_list all_head">
            <span class="data_num head">总数据：</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">
            <span class="data_num">{{allUserCount}}</span> 注册用户
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">
            <span class="data_num">{{allOrderCount}}</span> 订单
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">
            <span class="data_num">{{allAdminCount}}</span> 管理员
          </div>
        </el-col>
      </el-row>
    </div>
    <echarts :sevenDate="sevenDate" :sevenDay="sevenDay"></echarts>
  </div>
</template>


<script>
import { getRequest } from "../util/http.js";
import adminHeader from "@/common/admin-header";
import echarts from "@/common/echarts";
import axios from "axios";
export default {
  data() {
    return {
      userCount: null,
      orderCount: null,
      adminCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null,
      toDay: null,
      sevenDay: [],
      sevenDate: [],
      userArr: [],
      orderArr: [],
      adminArr: []
    };
  },
  components: {
    adminHeader,
    echarts
  },
  mounted() {
    this.initData();
    this.getEcharts();
  },
  methods: {
    getEcharts() {
      for (let i = 5; i >= 0; i--) {
        let a = this.getDate(new Date() - 86400000 * i);
        if (i === 0) {
          this.toDay = a;
        }
        this.countUser(a);
        this.countOrder(a);
        this.countAdmin(a);
        this.sevenDay.push(a); //图标日期-当天之前的6天日期
      }
      this.sevenDate.push(this.userArr, this.orderArr, this.adminArr); //图标数据-当天之前的6天
    },
    getDate(da) {
      let d = new Date(da);
      let year = d.getFullYear();
      let month =
        d.getMonth() + 1 < 10 ? 0 + "" + (d.getMonth() + 1) : d.getMonth() + 1;
      let day = d.getDate();
      return year + "-" + month + "-" + day;
    },
    countUser(day) {
      /** 当天新增用户*/
      getRequest("//elm.cangdu.org/statis/user/" + day + "/count")
        .then(res => {
          if (res.data.status === 1) {
            if (day == this.toDay) {
              this.userCount = res.data.count;
            }
            this.userArr.push(res.data.count);
          }
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    countOrder(day) {
      /** 当天新增订单*/
      getRequest("//elm.cangdu.org/statis/order/" + day + "/count")
        .then(res => {
          if (res.data.status === 1) {
            if (day == this.toDay) {
              this.orderCount = res.data.count;
            }
            this.orderArr.push(res.data.count);
          }
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    countAdmin(day) {
      /** 当天新增管理员*/
      getRequest("//elm.cangdu.org/statis/admin/" + day + "/count")
        .then(res => {
          if (res.data.status === 1) {
            if (day == this.toDay) {
              this.adminCount = res.data.count;
            }
            this.adminArr.push(res.data.count);
          }
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    initData() {
      /** 统计注册用户
      getRequest("//elm.cangdu.org/v1/users/count")
        .then(res => {
          if (res.data.status === 1) {
            this.allUserCount = res.data.count;
          }
        })
        .catch(err => {
          console.log("请求失败");
		});
		*/
      /** 统计订单
      getRequest("//elm.cangdu.org/bos/orders/count")
        .then(res => {
          if (res.data.status === 1) {
            this.allOrderCount = res.data.count;
          }
        })
        .catch(err => {
          console.log("请求失败");
		});
	*/
      /** 统计管理员
      getRequest("//elm.cangdu.org/admin/count")
        .then(res => {
          if (res.data.status === 1) {
            this.allAdminCount = res.data.count;
          }
        })
        .catch(err => {
          console.log("请求失败");
        });
		*/
      let _this = this;
      axios
        .all([
          getRequest("//elm.cangdu.org/v1/users/count"),
          getRequest("//elm.cangdu.org/bos/orders/count"),
          getRequest("//elm.cangdu.org/admin/count")
        ])
        // .then(
        //   axios.spread(function(res1, res2, res3) {
        //     _this.allUserCount = res1.data.count;
        //     _this.allOrderCount = res2.data.count;
        //     _this.allAdminCount = res3.data.count;
        //   })
        // )
        .then(
          axios.spread((res1, res2, res3) => {
            this.allUserCount = res1.data.count;
            this.allOrderCount = res2.data.count;
            this.allAdminCount = res3.data.count;
          })
        );
    }
  }
};
</script>

<style scoped>
.section_title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
}
.data_list {
  text-align: center;
  font-size: 14px;
  color: #666;
  border-radius: 6px;
  background: #e5e9f2;
}
.data_num {
  color: #333;
  font-size: 26px;
}
.head {
  border-radius: 6px;
  font-size: 22px;
  padding: 4px 0;
  color: #fff;
  display: inline-block;
}
.data_section {
  padding: 20px;
  margin-bottom: 40px;
}
.today_head {
  background: #ff9800;
}
.all_head {
  background: #20a0ff;
}
.wan {
  font-size: 16px;
  color: #333;
}
</style>