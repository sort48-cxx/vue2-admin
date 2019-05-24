<template>
  <div class="fillcontain">
    <admin-header></admin-header>
    <div class="table_container">
      <div class="layout">
        <el-table :data="tableData" border style="width: 100%;margin-bottom:20px;">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="店铺名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="店铺介绍">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="联系电话">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="评分">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="销售量">
                  <span>{{ props.row.recent_order_num }}</span>
                </el-form-item>
                <el-form-item label="分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="店铺名称" prop="name"></el-table-column>
          <el-table-column label="店铺地址" prop="address"></el-table-column>
          <el-table-column label="店铺介绍" prop="description"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="Success" @click="addFood(scope.$index, scope.row)">添加食品</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="Pagination">
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
      <el-dialog title="提示" width="70%" :visible.sync="dialogFormVisible">
        <el-form :model="selectTable">
          <el-form-item label="店铺名称" label-width="100px">
            <el-input v-model="selectTable.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" label-width="100px">
            <el-input v-model="address.address"></el-input>
          </el-form-item>
          <el-form-item label="店铺介绍" label-width="100px">
            <el-input v-model="selectTable.description"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" label-width="100px">
            <el-input v-model="selectTable.phone"></el-input>
          </el-form-item>
          <!-- <el-form-item label="店铺分类" label-width="100px">
            <el-cascader :options="categoryOptions" v-model="selectedCategory" change-on-select></el-cascader>
          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateShop">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
import adminHeader from "@/common/admin-header";
import { getRequest, postRequest, deleteRequest } from "../util/http.js";
export default {
  data() {
    return {
      //   baseUrl,
      //   baseImgPath,
      city: {},
      offset: 0,
      limit: 20,
      count: 0,
      tableData: [],
      currentPage: 1,
      selectTable: {},
      dialogFormVisible: false,
      categoryOptions: [],
      selectedCategory: [],
      address: {}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    showMessage(text) {
      this.$message({
        message: text,
        type: "warning"
      });
    },
    initData() {
      getRequest("//elm.cangdu.org/shopping/restaurants/count")
        .then(res => {
          this.count = res.data.count;
          this.getResturants();
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    getResturants() {
      getRequest("//elm.cangdu.org/shopping/restaurants", {
        latitude: 22.54286,
        longitude: 114.059563,
        offset: this.offset,
        limit: this.limit
      })
        .then(res => {
          this.tableData = [];
          res.data.forEach(item => {
            const tableData = {};
            tableData.name = item.name;
            tableData.address = item.address;
            tableData.description = item.description;
            tableData.id = item.id;
            tableData.phone = item.phone;
            tableData.rating = item.rating;
            tableData.recent_order_num = item.recent_order_num;
            tableData.category = item.category;
            tableData.image_path = item.image_path;
            this.tableData.push(tableData);
          });
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
      this.getResturants();
    },
    handleEdit(index, row) {
      this.selectTable = row;
      this.address.address = row.address;
      this.dialogFormVisible = true;
      //   this.selectedCategory = row.category.split("/");
      //   if (!this.categoryOptions.length) {
      //     this.getCategory();
      //   }
    },
    updateShop() {
      this.dialogFormVisible = false;
      postRequest("//elm.cangdu.org/shopping/updateshop", this.selectTable)
        .then(res => {
          if (res.data.status == 1) {
            this.showMessage("更新店铺信息成功");
            this.getResturants();
          } else {
            this.showMessage(res.data.message);
          }
        })
        .catch(err => {
          console.log("更新餐馆信息失败", err);
        });
    },
    handleDelete(index, row) {
      deleteRequest("//elm.cangdu.org/shopping/restaurant/" + row.id)
        .then(res => {
          if (res.data.status == 1) {
            this.showMessage("删除店铺成功");
            this.getResturants();
          } else {
            this.showMessage(res.data.message);
          }
        })
        .catch(err => {
          console.log("删除店铺失败");
        });
    },
    addFood(index, row) {
      this.$router.push({ path: "addGoods", query: { restaurant_id: row.id } });
    }
  },
  components: {
    adminHeader
  }
};
</script>

<style>
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
  width: 45%;
}
.table_container {
  padding: 20px;
}
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
