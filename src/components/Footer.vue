<template>
  <div>
    <footer class="footer mt-auto py-3 text-white text-center">
      <div class="gray-footer bg-bldGray py-5">
        <p class="title fs-4 px-auto Noto-Serif">
          <span>沒有找到想找的公車嗎？</span>
          <span>再搜尋一次👇🏻</span>
        </p>
        <div class="title-mobile fs-4 px-auto Noto-Serif">
          <p>沒有找到想找的公車嗎？</p>
          <p>再搜尋一次👇🏻</p>
        </div>
        <div>
          <router-link :to="{ name: 'Index' }">
            <button
              class="footer-btn btn btn-bldGreen text-white Noto-Sans px-2"
            >
              找指定的公車
            </button>
          </router-link>
        </div>
      </div>
      <div class="black-footer py-5">
        <div class="createdBy py-0 my-0 Noto-Serif">
          <p>
            Designed by
            <a href="https://www.instagram.com/kou.ikusen/" target="_blank">Kiks</a> and
            Developed by
            <a href="https://twitter.com/wahaha47168" target="_blank">cclin</a> with ❤️
          </p>
          <div class="mobile Noto-Serif lh-1">
            <p>
              Designed by
              <a href="https://www.instagram.com/kou.ikusen/">Kiks</a>
            </p>
            <p>
              Developed by <a href="https://twitter.com/wahaha47168">cclin</a>
            </p>
            <p>with ❤️</p>
            <!-- Designed by<a href="https://www.instagram.com/kou.ikusen/">Kiks</a>
Developed by<a href="https://twitter.com/wahaha47168">cclin</a>
with ❤️ -->
          </div>
        </div>
        <div class="copyright Noto-Sans">
          <p class="text-white-50">
            &copy; 2021 Kiks & cclin. All Rights Reseved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "Footer",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>
<style scoped>
.footer-btn {
  width: 286px;
  min-height: 83px;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-weight: 500;
  font-size: 25px;
  line-height: 36px;
  letter-spacing: 0.2em;
  margin: 44px auto 23px auto;
}
.black-footer {
  background-color: #222222;
  min-height: 189px;
}
.black-footer > pre {
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
}
.createdBy {
  font-size: 16px;
  letter-spacing: 0.64px;
}
.copyright > p {
  font-size: 12px;
  margin-bottom: 0;
}
.title-mobile {
  font-size: 25px;
  margin-bottom: 11px;
  font-size: 16px;
  height: 69px;
  line-height: 25px;
}
.title-mobile,
.createdBy > .mobile {
  display: block;
}
p.title,
.createdBy > p {
  display: none;
}
.mobile {
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  margin-bottom: 11px;
}
.mobile p {
  margin-bottom: 10px;
}
.green-footer.bg-bldGreen {
  padding-top: 80px;
  padding-bottom: 80px;
  letter-spacing: 2px;
}
.search-bar {
  margin-top: 24px;
  margin-bottom: 0;
}
.black-footer {
  padding-top: 46px;
  padding-bottom: 46px;
}
@media (min-width: 768px) {
  .title {
    /* width: 100%; */
    display: inline;
  }
  .title-mobile,
  .createdBy > .mobile {
    display: none;
  }
  p.title,
  .createdBy > p {
    display: block;
  }
  .green-footer.bg-bldGreen {
    padding-top: 160px;
    padding-bottom: 160px;
  }
  .search-bar {
    margin-top: 40px;
    margin-bottom: 0;
  }
  .black-footer {
    padding-top: 80px;
    padding-bottom: 80px;
  }
}
</style>
