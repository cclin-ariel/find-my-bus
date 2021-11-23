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
  <div class="animate-bottom" v-if="!this.isLoading">
    <Header />

    <router-link
      :to="{ name: 'SearchResult', params: { routeName: this.routeName } }"
      >get your search result</router-link
    >
  </div>
</template>

<script>
import Header from "./Header.vue";
export default {
  name: "Index",
  components: { Header },
  data() {
    return {
      routeName: "623",
      isLoading: true,
    };
  },
  mounted() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
  },
};
</script>
<style>
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
  border-color: #F8F9FA transparent transparent;
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
