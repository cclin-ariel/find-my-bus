<template>
  <div>
    <div class="px-2 header">
      <nav class="navbar shadow bg-white mx-auto mt-2 px-0">
        <div class="container-fluid d-flex">
          <div class="pe-1">
            <router-link :to="{ name: 'Index' }">
              <img class="logo" src="../img/logo.svg" alt="logo" />
            </router-link>
          </div>

          <div class="title Noto-Serif ms-1 text-bldGreen">
            這班公車幾點到～桃園限定～
          </div>
          <ul class="navbar-nav me-auto mb-2 mb-md-0"></ul>

          <div>
            <router-link :to="{ name: 'Index' }">
              <button class="btn btn-bldGreen text-white Noto-Sans px-2">
                現在就問 >>
              </button>
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.container-fluid {
  justify-content: flex-start !important;
}
.title {
  min-width: 157px;
  font-size: 12px;
}
.btn-bldGreen {
  font-size: 14px;
  max-width: 102px;
}

.navbar-brand {
  display: none;
  width: 5px;
}

@media (min-width: 768px) {
  .title {
    font-size: 20px;
  }
  nav {
    margin: 20px 40px;
    max-width: 1200px;
  }
  button {
    width: 100px;
  }

  .navbar-brand {
    display: block;
    width: 60px;
  }
  .navbar-brand {
    letter-spacing: 3px;
  }
}
</style>
