<template>
  <div>
    <admin-header></admin-header>
    <div class="table_container">
      <div class="layout">
        <el-table :data="tableData" border style="width: 100%;margin-bottom:20px">
          <el-table-column prop="user_name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="create_time" label="注册日期" width="220"></el-table-column>
          <el-table-column prop="city" label="地址" width="180"></el-table-column>
          <el-table-column prop="admin" label="权限"></el-table-column>
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
import adminHeader from "@/common/admin-header";
import { getRequest } from "../util/http.js";
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
    this.initData();
  },
  methods: {
    initData() {
      getRequest("//elm.cangdu.org/admin/count")
        .then(res => {
          this.count = res.data.count;
          this.getAdmin();
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
      this.getAdmin();
    },
    getAdmin() {
      getRequest("//elm.cangdu.org/admin/all", {
        offset: this.offset,
        limit: this.limit
      })
        .then(res => {
          this.tableData = [];
          if (res.data.status === 1) {
            res.data.data.forEach(item => {
              const tableItem = {
                create_time: item.create_time,
                user_name: item.user_name,
                admin: item.admin,
                city: item.city
              };
              this.tableData.push(tableItem);
            });
          } else {
            console.log(res.message);
          }
        })
        .catch(err => {
          console.log("请求失败" + err);
        });
    }
  }
};
</script>

<style scoped>
.table_container {
  background-color: #fff;
  padding: 20px;
}
.layout {
  margin: 20px;
}
</style>