<template>
  <div>
    <admin-header></admin-header>
    <div class="table_container">
      <div class="layout">
        <el-table
          :data="tableData"
          border
          @expand="expand"
          :expand-row-keys="expendRow"
          :row-key="row => row.index"
          style="width: 100%;margin-bottom:20px;"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="食品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="餐馆名称">
                  <span>{{ props.row.restaurant_name }}</span>
                </el-form-item>
                <el-form-item label="食品 ID">
                  <span>{{ props.row.item_id }}</span>
                </el-form-item>
                <el-form-item label="餐馆 ID">
                  <span>{{ props.row.restaurant_id }}</span>
                </el-form-item>
                <el-form-item label="食品介绍">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-form-item label="餐馆地址">
                  <span>{{ props.row.restaurant_address }}</span>
                </el-form-item>
                <el-form-item label="食品评分">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="食品分类">
                  <span>{{ props.row.category_name }}</span>
                </el-form-item>
                <el-form-item label="月销量">
                  <span>{{ props.row.month_sales }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="食品名称" prop="name"></el-table-column>
          <el-table-column label="食品介绍" prop="description"></el-table-column>
          <el-table-column label="评分" prop="rating"></el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
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
      <el-dialog title="修改食品信息" width="70%" :visible.sync="dialogFormVisible">
        <el-form :model="selectTable">
          <el-form-item label="食品名称" label-width="100px">
            <el-input v-model="selectTable.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍" label-width="100px">
            <el-input v-model="selectTable.description"></el-input>
          </el-form-item>
        </el-form>
        <!-- <el-row style="overflow: auto; text-align: center;">
          <el-table :data="specs" style="margin-bottom: 20px;" :row-class-name="tableRowClassName">
            <el-table-column prop="specs" label="规格"></el-table-column>
            <el-table-column prop="packing_fee" label="包装费"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="danger" @click="deleteSpecs(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="primary"
            @click="specsFormVisible = true"
            style="margin-bottom: 10px;"
          >添加规格</el-button>
        </el-row>-->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateFood">确 定</el-button>
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
      restaurant_id: null,
      city: {},
      offset: 0,
      limit: 20,
      count: 0,
      tableData: [],
      currentPage: 1,
      selectTable: {},
      dialogFormVisible: false,
      menuOptions: [],
      selectMenu: {},
      selectIndex: null,
      specsForm: {
        specs: "",
        packing_fee: 0,
        price: 20
      },
      specsFormrules: {
        specs: [{ required: true, message: "请输入规格", trigger: "blur" }]
      },
      specsFormVisible: false,
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
  methods: {
    showMessage(text) {
      this.$message({
        message: text,
        type: "warning"
      });
    },
    initData() {
      getRequest("//elm.cangdu.org/shopping/v2/foods/count")
        .then(res => {
          this.count = res.data.count;
          this.getFoods();
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    getFoods() {
      getRequest("//elm.cangdu.org/shopping/v2/foods", {
        offset: this.offset,
        limit: this.limit,
        restaurant_id: this.restaurant_id
      })
        .then(res => {
          this.tableData = [];
          res.data.forEach((item, index) => {
            const tableData = {};
            tableData.name = item.name;
            tableData.item_id = item.item_id;
            tableData.description = item.description;
            tableData.rating = item.rating;
            tableData.month_sales = item.month_sales;
            tableData.restaurant_id = item.restaurant_id;
            tableData.category_id = item.category_id;
            tableData.image_path = item.image_path;
            tableData.specfoods = item.specfoods;
            tableData.index = index;
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
      this.getFoods();
    },
    handleEdit(row) {
      this.selectTable = row;
      this.dialogFormVisible = true;
    },
    updateFood() {
      this.dialogFormVisible = false;
      postRequest("//elm.cangdu.org/shopping/v2/updatefood", this.selectTable)
        .then(res => {
          if (res.data.status == 1) {
            this.showMessage("更新食品信息成功");
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
      deleteRequest("//elm.cangdu.org/shopping/v2/food/" + row.item_id)
        .then(res => {
          if (res.data.status == 1) {
            this.showMessage("删除食品成功");
            this.getResturants();
          } else {
            this.showMessage(res.data.message);
          }
        })
        .catch(err => {
          console.log("删除食品失败");
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