<!--  Direction: 0  -->

<template>
  <div class="container bg-bldWhite">
    <div class="sessions mt-4 mx-auto">

      <!-- one way bus noticed -->
      <div v-if="Direction0.length < 1" class="Noto-Sans text-right fs-6">
        ※無資料
      </div>

      <!-- start of the timetable list   Direction: 0 -->
      <div
        v-for="(stop, index) in Direction0Temp.slice(0, 7)"
        :key="index"
        class="row g-1"
      >
        <!-- start of the left side of vertical timeline -->
        <div class="col-3 timeline-left text-center">
          <div class="row time">
            {{ arriveTime(stop.NextBusTime) }}
          </div>

          <!-- start of arrow 若有預計進站巴士 則顯示  -->
          <div
            v-if="
              stop.PlateNumb &&
              this.Direction0Temp[index + 1].PlateNumb == stop.PlateNumb
            "
            class="row arrow ms-1"
          ></div>
          <!-- end of arrow -->
        </div>
        <!-- end of the left side of vertical timeline -->

        <!-- start of the right side of vertical timeline -->
        <div
          class="noBus col-8"
          :class="{
            bus: stop.VehicleStopStatus == 1,
            noBus: stop.VehicleStopStatus !== 1,
          }"
        >
          <!-- index 為三的位置 是focused  -->
          <div
            :class="{
              bldBlack: index !== 3,
              bldGreen: index == 3,
            }"
            class="stop Noto-Sans"
          >
            <img v-if="index == 3" src="../img/pin.svg" alt="pin" />
            {{ stop.StopName.Zh_tw }}
          </div>

          <!--start of 當巴士站的即時資訊 -->
          <p v-if="stop.StopStatus == 1">尚未發車</p>
          <p v-if="stop.StopStatus == 2">交管不停靠</p>
          <p v-if="stop.StopStatus == 3">末班車已過</p>
          <p v-if="stop.StopStatus == 4">今日未營運</p>
          <p v-if="stop.StopStatus == 0" class="Noto-Sans text-bldBlack">
            約
            {{ secondBetweenTwoDate(stop.NextBusTime) }}
            分鐘後到站
          </p>
          <!--end of 當巴士站的即時資訊 -->
        </div>
        <!-- end of the right side of vertical timeline -->
      </div>
      <!-- end of the timetable -->
    </div>
  </div>
</template>
<script>
import jsSHA from "jssha";

export default {
  name: "Direction0",

  props: {
    routeID: {
      type: String,
      required: true,
    },
    theStop: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      Direction0: [], //ordered full data 原始Array
      Direction0Temp: [], //v-form用array
    };
  },
  created() {
    this.getBusTime();
  },
  watch: {
    //watch the stop from BusDetail's dropdownlist
    theStop() {
      this.Direction0Temp = this.Direction0;
      
      //set to the focused stop, and update to Direction0Temp(v-form用array)
      const index = this.Direction0.findIndex(
        (element) => element.StopID == this.theStop
      );
      if (index > 3) this.Direction0Temp = this.Direction0Temp.slice(index - 3);

      //when the value change, reload the timetable
      this.$forceUpdate(this.Direction0Temp);
    },
  },
  methods: {
    // formatter the time
    arriveTime(NextBusTime) {
      let x = new Date(NextBusTime);
      if (x.getMinutes() < 10) return `${x.getHours()} : 0${x.getMinutes()}`;
      if (x.getMinutes() > 10) return `${x.getHours()} : ${x.getMinutes()}`;
    },

    // the waiting time at every stop
    secondBetweenTwoDate(NextBusTime) {
      let x = new Date(NextBusTime);
      return Math.floor(
        Math.abs((new Date().getTime() - x.getTime()) / 1000) / 60
      );
    },

    // get this bus detail
    getBusTime() {
      const vm = this;
      const axios = require("axios");
      const busTimeAPI = `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan?$filter=RouteID%20eq%20'${vm.routeID}'&$format=JSON`;
      axios
        .get(busTimeAPI, {
          headers: vm.getAuthorizationHeader(),
        })
        .then((response) => {
          // 取方向為０的班次
          let temp0 = response.data.filter(
            (busStop) => busStop.Direction == "0"
          );

          // 按站牌順序排列
          vm.Direction0 = temp0.sort(function (a, b) {
            // boolean false == 0; true == 1
            return Number(a.StopSequence) - Number(b.StopSequence);
          });

          // update to Direction0Temp(v-form用array)
          vm.Direction0Temp = vm.Direction0;
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
@mixin tablet-and-up {
  @media screen and (min-width: 769px) {
    @content;
  }
}
@mixin mobile-and-up {
  @media screen and (min-width: 601px) {
    @content;
  }
}
@mixin tablet-and-down {
  @media screen and (max-width: 768px) {
    @content;
  }
}
@mixin mobile-only {
  @media screen and (max-width: 600px) {
    @content;
  }
}

ul,
li {
  list-style: none;
  padding: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 0 1rem;
  padding: 3rem 0; */
}

.sessions {
  width: 300px;
  padding: 0 0 20px 37px;
}
.timeline-left {
  max-width: 90px;
  font-size: 18px;
  line-height: 26px;
}
.arrow {
  width: 14px;
  height: 14px;
  margin-top: 13px;
  background-image: url(../img/arrow.svg);
  background-repeat: no-repeat;
}
.bus,
.noBus {
  max-width: 224px;
  padding-bottom: 0.1px;
  border-left: 3px solid #e0e0e0;
  position: relative;
  padding-left: 20px;
  margin-left: 10px;
}
/* li:last-child {
  border: 0px;
  padding-bottom: 0;
} */
.noBus:before {
  content: "";
  width: 20px;
  height: 20px;
  background: #e0e0e0;

  /* border: 1px solid #4e5ed3;
  box-shadow: 3px 3px 0px #bab5f8;
  box-shadow: 3px 3px 0px #bab5f8; */
  border-radius: 50%;
  position: absolute;
  left: -12px;
  top: 0px;
}
.bus:before {
  content: "";
  width: 20px;
  height: 20px;
  background: white;
  background-image: url(../img/bus.svg);

  position: absolute;
  left: -10px;
  top: 0px;
}
.bldBlack {
  color: #000000;
}
.bldGreen {
  color: #7ca23c;
}
.stop {
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
}
p {
  font-size: 18px;
  line-height: 26px;

  margin-top: 0.4rem;
  @include mobile-only {
    font-size: 0.9rem;
  }
}
</style>
