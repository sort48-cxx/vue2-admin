<template>
  <div>
    <admin-header></admin-header>
    <div class="table_container">
      <div class="layout">
        <el-table :data="tableData" border highlight-current-row style="width: 100%" class="mb-20">
          <el-table-column type="index" width="100"></el-table-column>
          <el-table-column property="registe_time" label="注册日期" width="220"></el-table-column>
          <el-table-column property="username" label="用户姓名" width="220"></el-table-column>
          <el-table-column property="city" label="注册地址"></el-table-column>
        </el-table>

        <div class="Pagination" style="text-align: left;margin-top: 10px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="20"
            background
            layout="total, prev, pager, next"
            :total="count"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRequest, postRequest } from "../util/http.js";
import adminHeader from "@/common/admin-header";
export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1
    };
  },
  components: {
    adminHeader
  },
  created() {
    this.initdata();
  },
  methods: {
    initdata() {
      getRequest("//elm.cangdu.org/v1/users/count")
        .then(res => {
          this.count = res.data.count;
          this.getUsers();
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getUsers();
    },
    getUsers() {
      getRequest("//elm.cangdu.org/v1/users/list", {
        offset: this.offset,
        limit: this.limit
      })
        .then(res => {
          this.tableData = [];
          res.data.forEach(item => {
            const tableData = {};
            tableData.username = item.username;
            tableData.registe_time = item.registe_time;
            tableData.city = item.city;
            this.tableData.push(tableData);
          });
        })
        .catch(err => {
          console.log("请求失败");
        });
    }
  }
};
</script>

<style scope>
.table_container {
  background-color: #fff;
  padding: 20px;
}
.layout {
  margin: 20px;
}
</style>