<template>
  <!-- start of loading -->
  <div
    v-if="this.isLoading"
    class="Landing-Page-First-Impression bg-white d-flex"
  >
    <div class="text-bldGreen Noto-Serif text-center m-auto dialog-bottom">
      <div class="Page-subtitle m-2 pt-4">不好意思請問一下</div>
      <div class="Page-Title pt-1">這班公車幾點到？</div>
    </div>
  </div>
  <!-- end of loading -->

  <!-- loading動畫結束 網頁進場動畫開始 -->
  <div class="animate-bottom" v-if="!this.isLoading">
    <div class="fixed-top">
      <Header />
    </div>

    <!-- start of input search area -->
    <div class="container-fluid pt-5">
      <div class="search-title text-center text-bldBlack Noto-Serif">
        找指定的公車
      </div>
      <form class="row g-4 Noto-Sans mx-auto p-0">
        <div class="col-9 search-input p-0">
          <input
            required
            type="text"
            class="form-control ps-2 pe-0"
            id="routeName"
            placeholder="輸入公車路線名稱"
            v-model="tempRouteName"
            @change="updateRouteName"
          />
        </div>
        <router-link
          class="col-3"
          :to="{ name: 'SearchResult', params: { routeName: this.routeName } }"
        >
          <button type="submit" class="search-btn btn btn-bldGreen text-white">
            搜尋
          </button>
        </router-link>
      </form>
      <!-- end of input search area -->

      <!-- star of 間隔線 -->
      <div class="OR text-bldGreen">
        <span class="line"></span>
        <span class="txt Noto-Serif">或是</span>
        <span class="line"></span>
      </div>
      <!-- end of 間隔線 -->

      <!-- 下拉選單 開始 -->
      <div class="card mx-auto">
        <div
          id="selected-routeName"
          class="card-header text-center bg-bldGreen text-white"
        >
          選擇公車路線
        </div>
        <select
          v-model="selected"
          class="card-body form-select-sm text-center"
          aria-label="Default select example"
          @change="updateRouteIdToDetail"
        >
          <option value="">請選擇</option>
          <option
            v-for="route in busRoutes"
            :value="route.RouteID"
            :key="route.RouteID"
          >
            {{ route.RouteName.Zh_tw }}
          </option>
        </select>
      </div>
      <!--  下拉選單 結束-->
    </div>
    <Footer />
  </div>
</template>

<script>
import jsSHA from "jssha";

import Header from "./Header.vue";
import Footer from "./Footer.vue";
export default {
  name: "Index",
  components: { Header, Footer },
  data() {
    return {
      isLoading: true, // loading animation
      routeName: "none", //send to SearchResult page by router
      RouteID: "none", //send to BusDetail page by router
      tempRouteName: "", //input search value
      selected: "", //dropdown list search value
      busRoutes: [], //dropdown list option
    };
  },
  created() {
    //get dropdown list option
    this.getBusRoutes();
  },
  mounted() {
    //loading animation
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  },
  methods: {
    // get bus list for dropdown list
    getBusRoutes() {
      const vm = this;
      const axios = require("axios");
      const busRoutesAPI = `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/Taoyuan?$format=JSON`;

      axios
        .get(busRoutesAPI, {
          headers: vm.getAuthorizationHeader(),
        })
        .then((response) => {
          vm.busRoutes = response.data;
          // console.log(vm.busRoutes);
        })
        .catch(function (error) {
          console.log(error);
        });

      this.getAuthorizationHeader();
    },
    // update value from input search value
    updateRouteName() {
      this.routeName = this.tempRouteName;
    },
    //update value from dropdown list value
    updateRouteIdToDetail() {
      this.RouteID = this.selected;
      this.$router.push({
        name: "BusDetail",
        params: {
          routeID: this.selected,
        },
      });
    },

    getAuthorizationHeader() {
      //  填入自己 ID、KEY 開始
      let AppID = "769b6e9f60594d2397e5ae2e24a5c5e3";
      let AppKey = "qM6fHVPRJkxJTxVkDwJL8ddKJ1A";
      //  填入自己 ID、KEY 結束
      let GMTString = new Date().toGMTString();
      let ShaObj = new jsSHA("SHA-1", "TEXT");
      ShaObj.setHMACKey(AppKey, "TEXT");
      ShaObj.update("x-date: " + GMTString);
      let HMAC = ShaObj.getHMAC("B64");
      let Authorization =
        'hmac username="' +
        AppID +
        '", algorithm="hmac-sha1", headers="x-date", signature="' +
        HMAC +
        '"';
      return { Authorization: Authorization, "X-Date": GMTString };
    },
  },
};
</script>

<style scoped>
.search-title {
  margin-bottom: 50px;
  margin-top: 80px;
  font-size: 25px;
  font-weight: 400;
}
.search-input {
  max-width: 292px;
}
.search-btn {
  max-width: 72px;
}
form {
  max-width: 360px;
  flex-wrap: nowrap !important;
}
.OR {
  height: 60px;
  line-height: 60px;
  text-align: center;
  margin: 93px 0;
}
.OR .line {
  display: inline-block;
  width: 106px;
  border-top: 0.5px solid #7ca23c;
}
.OR .txt {
  vertical-align: middle;
  font-size: 18px;
  padding: 0 17px;
  font-weight: 400;
  letter-spacing: 0.2em;
}
.card {
  max-width: 370px;

  font-size: 18px;
  font-weight: 400;
  margin-bottom: 93px;
  border: 0;
}
.card-header {
  height: 37px;
  border: 1px solid #7ca23c;
  border-radius: 10px 10px 0 0;
}
select {
  height: 40px;
  padding: 0;
  font-size: 18px;
  border: 1px solid #7ca23c;
  border-radius: 0 0 10px 10px;
}
option {
  font-size: 18px;
}

.Landing-Page-First-Impression {
  height: 100vh;
}
.animate-bottom {
  /* position: relative; */
  -webkit-animation-name: animateBottom;
  -webkit-animation-duration: 1s;
  animation-name: animateBottom;
  animation-duration: 1s;
}
@-webkit-keyframes animateBottom {
  from {
    bottom: -100px;
    opacity: 0;
  }
  to {
    bottom: 0px;
    opacity: 1;
  }
}

@keyframes animateBottom {
  from {
    bottom: -100px;
    opacity: 0;
  }
  to {
    bottom: 0;
    opacity: 1;
  }
}
.Page-subtitle {
  font-size: 18px;
  font-weight: 400;
  line-height: 25.87px;
  letter-spacing: 0.2em;
}
.Page-Title {
  font-size: 25px;
  font-weight: 400;
  line-height: 35.93px;
  letter-spacing: 0.2em;
}
.dialog-bottom {
  border: 1px solid #7ca23c;
  border-radius: 50px;
  height: 136px;
  position: relative;
  width: 330px;
}
.dialog-bottom::before {
  border-color: #7ca23c transparent transparent;
  border-style: solid solid solid;
  border-width: 20px 20px 20px 20px;
  bottom: -40px;
  /* 必須指定，才能顯示內容 */
  content: "";
  height: 0px;
  left: 137px;
  /* 必須指定，否則會變梯形 */
  position: absolute;
  width: 0px;
}
.dialog-bottom::after {
  border-color: #f8f9fa transparent transparent;
  border-style: solid solid solid solid;
  border-width: 20px;
  bottom: -38px;
  /* 必須指定，才能顯示內容 */
  content: "";
  height: 0px;
  left: 137px;
  /* 必須指定，否則會變梯形 */
  position: absolute;
  width: 0px;
}
</style>
