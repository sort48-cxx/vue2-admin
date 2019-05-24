<template>
  <div>
    <admin-header></admin-header>
    <div class="table_container">
      <div class="layout">
        <el-table
          :data="tableData"
		  border
          :expand-row-keys="expendRow"
          :row-key="row => row.index"
          style="width: 100%;margin-bottom:20px"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="用户名">
                  <span>{{ props.row.user_name }}</span>
                </el-form-item>
                <el-form-item label="店铺名称">
                  <span>{{ props.row.restaurant_name }}</span>
                </el-form-item>
                <el-form-item label="收货地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.restaurant_id }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.restaurant_address }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="订单 ID" prop="id"></el-table-column>
          <el-table-column label="总价格" prop="total_amount"></el-table-column>
          <el-table-column label="订单状态" prop="status"></el-table-column>
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
      currentPage: 1,
      restaurant_id: null,
      expendRow: []
    };
  },
  components: {
    adminHeader
  },
  created() {
    this.restaurant_id = this.$route.query.restaurant_id;
    this.initData();
  },
  mounted() {},
  methods: {
    initData() {
      getRequest("//elm.cangdu.org/bos/orders/count")
        .then(res => {
          this.count = res.data.count;
          this.getOrders();
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
      this.getOrders();
    },
    getOrders() {
      getRequest("//elm.cangdu.org/bos/orders", {
        offset: this.offset,
        limit: this.limit,
        restaurant_id: this.restaurant_id
      })
        .then(res => {
          this.tableData = [];
          res.data.forEach((item, index) => {
            const tableData = {};
            tableData.id = item.id;
            tableData.total_amount = item.total_amount;
            tableData.status = item.status_bar.title;
            tableData.user_id = item.user_id;
            tableData.restaurant_id = item.restaurant_id;
            getRequest(
              "//elm.cangdu.org/shopping/restaurant/" + item.restaurant_id
            )
              .then(res => {
                tableData.restaurant_name = res.data.name;
                tableData.restaurant_address = res.data.address;
              })
              .catch(err => {
                console.log("请求失败");
              });
            getRequest("//elm.cangdu.org/v1/user/" + item.user_id)
              .then(res => {
                tableData.user_name = res.data.username;
              })
              .catch(err => {
                console.log("请求失败");
              });
            getRequest("//elm.cangdu.org/v1/addresse/" + item.address_id)
              .then(res => {
                tableData.address = res.data.address;
              })
              .catch(err => {
                console.log("请求失败");
              });
            tableData.address_id = item.address_id;
            tableData.index = index;
            this.tableData.push(tableData);
          });
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
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
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>