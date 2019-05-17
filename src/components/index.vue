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
            <span class="data_num">0</span> 新增用户
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">
            <span class="data_num">0</span> 新增订单
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">
            <span class="data_num">0</span> 新增管理员
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
            <span class="data_num">0</span> 注册用户
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">
            <span class="data_num">0</span> 订单
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">
            <span class="data_num">0</span> 管理员
          </div>
        </el-col>
      </el-row>
    </div>
    <echarts></echarts>
  </div>
</template>


<script>
import adminHeader from "@/common/admin-header";
import echarts from "@/common/echarts";
export default {
  data() {
    return {
      msg: "hi"
    };
  },
  components: {
    adminHeader,
    echarts
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