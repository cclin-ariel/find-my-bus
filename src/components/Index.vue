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
    <div class="container-fluid">
      <div class="search-title text-center text-bldBlack Noto-Serif">
        找指定的公車
      </div>

      <form class="row justify-content-between g-2 Noto-Sans mx-auto p-0">
        <div class="col-9 search-input p-0">
          <input
            type="text"
            class="form-control ps-2 pe-0"
            id="routeName"
            placeholder="輸入公車路線名稱"
          />
        </div>
        <button
          type="submit"
          class="col-2 search-btn btn btn-bldGreen text-white"
        >
          搜尋
        </button>
      </form>
      <div class="OR text-bldGreen">
        <span class="line"></span>
        <span class="txt Noto-Serif">或是</span>
        <span class="line"></span>
      </div>

      <div class="card">
        <div class="card-header text-center bg-bldGreen text-white">
          選擇公車路線
        </div>
        <select
          class="card-body form-select text-center"
          aria-label="Default select example"
        >
          <option selected>307</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <router-link
        :to="{ name: 'SearchResult', params: { routeName: this.routeName } }"
        >get your search result</router-link
      >
    </div>
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
.search-title {
  margin-bottom: 50px;
  margin-top: 80px;
  font-size: 25px;
  font-weight: 400;
}
.search-input {
  width: 292px;
}
.search-btn {
  width: 72px;
}
form {
  max-width: 360px;
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
  font-size: 18px;
  font-weight: 400;
  /* height: 82px; */
}
.card-header {
  height: 37px;
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
