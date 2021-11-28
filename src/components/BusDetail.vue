<template>
  <div class="fixed-top">
    <Header />
  </div>

  <div class="container-fluid pt-5">
    <div class="detail-title text-center text-bldBlack Noto-Serif">
      <span class="text-bldGreen">{{ routeName }}</span> 路線的到站資訊
    </div>

    <!-- start of 指定站牌下拉選單 -->
    <div class="card mx-auto">
      <div class="card-header text-center bg-bldGreen text-white">指定站牌</div>
      <select
        v-model="theStop"
        class="card-body form-select text-center mx-auto"
        aria-label="Default select example"
      >
        <option value="" disabled>{{ stopsList[3].StopName.Zh_tw }}</option>
        <option
          v-for="stop in stopsList"
          :value="stop.StopID"
          :key="stop.StopID"
        >
          {{ stop.StopName.Zh_tw }}
        </option>
      </select>
    </div>
    <!-- end of 指定站牌下拉選單 -->

    <transition name="slide-fade" mode="out-in">
      <!-- when theStop value changes, trigger slide-fade transition -->

      <!-- start of 去返程 選擇按鈕 -->
      <div :key="theStop" class="stops-card px-2 mx-auto">
        <div class="direction-selection d-flex justify-content-evenly mx-auto">
          <router-link :to="{ name: 'Direction0' }">
            <button
              :class="{ selectedColor: direction == '0' }"
              class="
                direction-btn
                search-btn
                btn
                text-bldBlack
                Noto-Sans
                px-5
                my-1
              "
              @click="direction = 0"
            >
              去程
            </button>
          </router-link>
          <router-link
            :to="{ name: 'Direction1', params: { routeID: routeID } }"
          >
            <button
              :class="{ selectedColor: direction == '1' }"
              class="
                direction-btn
                btn btn-white
                text-bldBlack
                Noto-Sans
                px-5
                my-1
              "
              @click="direction = 1"
            >
              返程
            </button></router-link
          >
        </div>
        <!-- end of 去返程 選擇按鈕 -->

        <!-- start of 巴士時刻表  component: Direction0 / Direction1 -->
        <router-view :routeIDupdate="routeID" :theStop="theStop" />
      </div>
    </transition>
  </div>

  <Footer />
</template>

<script>
import jsSHA from "jssha";

import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  name: "BusDetail",
  components: { Header, Footer },

  props: {
    // from landing page
    routeID: { type: String, required: true },
  },
  data() {
    return {
      routeName: "", // the route of this detail page, and print to the page tittle
      stopsList: [], //dropdown list
      theStop: "", //dropdown list value to switch the focused stop in the 巴士時刻表
      direction: 0,
    };
  },
  created() {
    //get the dropdown list option
    this.getStopsList();
  },
  methods: {
    //get the dropdown list option
    getStopsList() {
      const vm = this;
      const axios = require("axios");
      const busRoutesAPI = `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/Taoyuan?$filter=RouteID%20eq%20'${vm.routeID}'&$format=JSON`;

      axios
        .get(busRoutesAPI, {
          headers: vm.getAuthorizationHeader(),
        })
        .then((response) => {
          vm.routeName = response.data[0].RouteName.Zh_tw;

          vm.stopsList = response.data[0].Stops.sort(function (a, b) {
            // boolean false == 0; true == 1
            return Number(a.StopSequence) - Number(b.StopSequence);
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      this.getAuthorizationHeader();
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
.container-fluid {
  margin-bottom: 60px;
}

.detail-title {
  margin-bottom: 50px;
  margin-top: 80px;
  font-size: 25px;
  line-height: 26px;
  letter-spacing: 0.2em;
}

.card {
  max-width: 370px;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 13px;
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

.stops-card {
  max-width: 370px;
  border: 1px solid #7ca23c;
  border-radius: 10px;
}

.direction-selection {
  max-width: 332px;
  height: 44px;
  margin-top: 12px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 5px;
}

.direction-btn {
  border-radius: 5px;
  max-width: 159px;
  height: 31px;
}

.checkAgain {
  font-size: 14px;
  line-height: 20px;
  padding-right: 18px;
  padding-top: 7px;
}

.selectedColor {
  background: #e0e0e0;
}

/* slide fade animation */
.slide-fade-enter-active {
  transition: all 0.3s ease-in-out;
}
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
