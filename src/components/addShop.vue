<template>
  <div>
    <admin-header></admin-header>
    <el-row style="padding-top: 20px;" class="page-grid-bg">
      <el-col :span="12" :offset="4">
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="110px"
          class="demo-formData"
        >
          <el-form-item label="店铺名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入店铺名称"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-autocomplete
              v-model="formData.address"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入地址"
              style="width: 100%;"
              @select="addressSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介" prop="description">
            <el-input v-model="formData.description" placeholder="请输入店铺简介"></el-input>
          </el-form-item>
          <el-form-item label="店铺标语" prop="promotion_info">
            <el-input v-model="formData.promotion_info" placeholder="请输入店铺标语"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-cascader :options="options" v-model="selectedCategory" change-on-select></el-cascader>
          </el-form-item>
          <el-form-item label="店铺特点" style="white-space: nowrap;">
            <span>品牌保证</span>
            <el-switch on-text off-text v-model="formData.is_premium"></el-switch>
            <span>蜂鸟专送</span>
            <el-switch on-text off-text v-model="formData.delivery_mode"></el-switch>
            <span>新开店铺</span>
            <el-switch on-text off-text v-model="formData.new"></el-switch>
          </el-form-item>
          <el-form-item style="white-space: nowrap;">
            <span>外卖保</span>
            <el-switch on-text off-text v-model="formData.bao"></el-switch>
            <span>准时达</span>
            <el-switch on-text off-text v-model="formData.zhun"></el-switch>
            <span>开发票</span>
            <el-switch on-text off-text v-model="formData.piao"></el-switch>
          </el-form-item>
          <el-form-item label="配送费" prop="float_delivery_fee">
            <el-input-number v-model="formData.float_delivery_fee" :min="0" :max="20"></el-input-number>
          </el-form-item>
          <el-form-item label="起送价" prop="float_minimum_order_amount">
            <el-input-number v-model="formData.float_minimum_order_amount" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="营业时间" style="white-space: nowrap;">
            <el-time-select
              placeholder="起始时间"
              v-model="formData.startTime"
              :picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30'
							}"
            ></el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="formData.endTime"
              :picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30',
							minTime: formData.startTime
							}"
            ></el-time-select>
          </el-form-item>
          <el-form-item label="上传店铺头像">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8080/vue2-admin"
              :show-file-list="false"
              :on-success="handleShopAvatarScucess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="formData.image_path" :src="formData.image_path" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传营业执照">
            <el-upload
              class="avatar-uploader"
              action="/v1/addimg/shop"
              :show-file-list="false"
              :on-success="handleBusinessAvatarScucess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="formData.business_license_image"
                :src="baseImgPath + formData.business_license_image"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传餐饮服务许可证">
            <el-upload
              class="avatar-uploader"
              action="/v1/addimg/shop"
              :show-file-list="false"
              :on-success="handleServiceAvatarScucess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="formData.catering_service_license_image"
                :src="baseImgPath + formData.catering_service_license_image"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="优惠活动">
            <el-select
              v-model="activityValue"
              @change="selectActivity"
              :placeholder="activityValue"
            >
              <el-option
                v-for="item in selectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-table
            :data="activities"
            style="min-width: 600px;margin-bottom: 20px;"
            align="cneter"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="icon_name" label="活动标题" align="cneter" width="120"></el-table-column>
            <el-table-column prop="name" label="活动名称" align="cneter" width="120"></el-table-column>
            <el-table-column prop="description" align="cneter" label="活动详情"></el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button size="small" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item class="button_submit">
            <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import adminHeader from "@/common/admin-header";
export default {
  data() {
    return {
      list: [
        {
          name: "壹海城",
          address: "广东省深圳市盐田区深盐路与海山路交汇处西南角(区政府对面)",
          latitude: 22.553151,
          longitude: 114.239297,
          geohash: "22.553151,114.239297"
        },
        {
          name: "壹方城",
          address: "广东省深圳市宝安区新安新湖路宝安新中心区壹方中心",
          latitude: 22.55375,
          longitude: 113.88732,
          geohash: "22.55375,113.88732"
        },
        {
          name: "壹方中心",
          address: "广东省深圳市宝安区新湖路与创业一路交汇处",
          latitude: 22.55362,
          longitude: 113.8873,
          geohash: "22.55362,113.8873"
        },
        {
          name: "田贝①[公交站]",
          address:
            "M403,312,369,82,307,27,高峰专线32号,高快巴士20,357,M408,M239,M203,369区间大站快线,M192,M526,M437,M183,213,高快巴士20号,M414,977,M559",
          latitude: 22.561401,
          longitude: 114.12345,
          geohash: "22.561401,114.12345"
        },
        {
          name: "梅林一村",
          address: "广东省深圳市福田区梅林路148号",
          latitude: 22.5665,
          longitude: 114.0375,
          geohash: "22.5665,114.0375"
        },
        {
          name: "鸿荣源壹城中心",
          address: "广东省深圳市龙华区人民路(地铁4号线龙华站)",
          latitude: 22.64929,
          longitude: 114.02764,
          geohash: "22.64929,114.02764"
        },
        {
          name: "布吉一村",
          address: "广东省深圳市龙岗区 ",
          latitude: 22.60269,
          longitude: 114.11583,
          geohash: "22.60269,114.11583"
        },
        {
          name: "莲花一村",
          address: "广东省深圳市福田区莲花一村",
          latitude: 22.55369,
          longitude: 114.07022,
          geohash: "22.55369,114.07022"
        },
        {
          name: "熙龙湾一期",
          address: "广东省深圳市宝安区甲岸路3号",
          latitude: 22.547396,
          longitude: 113.888954,
          geohash: "22.547396,113.888954"
        },
        {
          name: "壹间",
          address: "广东省深圳市南山区工业九路28号",
          latitude: 22.50321,
          longitude: 113.92566,
          geohash: "22.50321,113.92566"
        }
      ],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            }
          ]
        }
      ],
      formData: {
        name: "", //店铺名称
        address: "", //地址
        latitude: "",
        longitude: "",
        description: "", //介绍
        phone: "",
        promotion_info: "",
        float_delivery_fee: 5, //运费
        float_minimum_order_amount: 20, //起价
        is_premium: true,
        delivery_mode: true,
        new: true,
        bao: true,
        zhun: true,
        piao: true,
        startTime: "",
        endTime: "",
        image_path: "",
        business_license_image: "",
        catering_service_license_image: ""
      },
      rules: {
        name: [{ required: true, message: "请输入店铺名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }]
      },
      categoryOptions: [],
      selectedCategory: ["快餐便当", "简餐"],
      selectOptions: [
        {
          value: "满减优惠",
          label: "满减优惠"
        },
        {
          value: "优惠大酬宾",
          label: "优惠大酬宾"
        },
        {
          value: "新用户立减",
          label: "新用户立减"
        },
        {
          value: "进店领券",
          label: "进店领券"
        }
      ],
      activityValue: "满减优惠",
      activities: [
        {
          icon_name: "减",
          name: "满减优惠",
          description: "满30减5，满60减8"
        }
      ]
    };
  },
  mounted() {},
  components: {
    adminHeader
  },
  methods: {
    querySearchAsync(queryString, cb) {
      if (queryString) {
        try {
          const cityList = this.list;
          if (cityList instanceof Array) {
            cityList.map(item => {
              item.value = item.address;
              return item;
            });
            cb(cityList);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    addressSelect(address) {
      this.formData.latitude = address.latitude;
      this.formData.longitude = address.longitude;
      console.log(this.formData.latitude, this.formData.longitude);
    },
    handleShopAvatarScucess(res, file) {
      if (res.status == 1) {
        this.formData.image_path = res.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    handleBusinessAvatarScucess(res, file) {
      if (res.status == 1) {
        this.formData.business_license_image = res.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    handleServiceAvatarScucess(res, file) {
      if (res.status == 1) {
        this.formData.catering_service_license_image = res.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    selectActivity() {
      this.$prompt("请输入活动详情", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value == null) {
            this.$message({
              type: "info",
              message: "请输入活动详情"
            });
            return;
          }
          let newObj = {};
          switch (this.activityValue) {
            case "满减优惠":
              newObj = {
                icon_name: "减",
                name: "满减优惠",
                description: value
              };
              break;
            case "优惠大酬宾":
              newObj = {
                icon_name: "特",
                name: "优惠大酬宾",
                description: value
              };
              break;
            case "新用户立减":
              newObj = {
                icon_name: "新",
                name: "新用户立减",
                description: value
              };
              break;
            case "进店领券":
              newObj = {
                icon_name: "领",
                name: "进店领券",
                description: value
              };
              break;
          }
          this.activities.push(newObj);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    tableRowClassName(row, index) {
      if (index === 1) {
        return "info-row";
      } else if (index === 3) {
        return "positive-row";
      }
      return "";
    },
    handleDelete(index) {
      this.activities.splice(index, 1);
    },
    submitForm(formName) {
      console.log;
      this.$refs[formName].validate(valid => {
        if (valid) {
          Object.assign(
            this.formData,
            { activities: this.activities },
            {
              category: this.selectedCategory.join("/")
            }
          );
          console.log(this.formData);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
.button_submit {
  text-align: center;
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
.info-row {
  background: #c9e5f5;
}

.positive-row {
  background: #e2f0e4;
}
</style>