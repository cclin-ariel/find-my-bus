<template>
  <Header />
  <div class="container-fluid">
    <div class="search-title text-center text-bldBlack Noto-Serif">
      <span class="text-bldGreen">{{ this.$route.params.routeName }}</span>
      的公車路線搜尋結果
    </div>
  </div>

  <div class="search-result text-center">
    <router-link
      :to="{
        name: 'BusDetail',
        params: {
          routeName: this.routeNameToDetail,
          busStop: this.busStopToDetail,
          direction: this.directionToDetail,
        },
      }"
    >
      <button class="search-btn btn btn-white text-bldBlack Noto-Serif px-2">
        {{ this.$route.params.routeName }}
      </button>
    </router-link>
    <router-link
      :to="{
        name: 'BusDetail',
        params: {
          routeName: this.routeNameToDetail,
          busStop: this.busStopToDetail,
          direction: this.directionToDetail,
        },
      }"
    >
      <button class="search-btn btn btn-white text-bldBlack Noto-Serif px-2">
        {{ this.$route.params.routeName }}
      </button>
    </router-link>
  </div>
  <Footer />
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  name: "SearchResult",
  components: { Header, Footer },

  data() {
    return {
      routeNameToDetail: "",

      busStopToDetail: "fourthStop",
      directionToDetail: 0,
    };
  },
  created() {
    this.routeNameToDetail = this.$route.params.routeName;
  },
};
</script>

<style scoped>
.search-title {
  margin-bottom: 50px;
  margin-top: 80px;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: 0.2em;
}
.search-btn {
  width: 257px;
  min-height: 67px;
  border: 1px solid #7ca23c;
  box-sizing: border-box;
  border-radius: 10px;
  margin: 10px auto;
}
</style>
