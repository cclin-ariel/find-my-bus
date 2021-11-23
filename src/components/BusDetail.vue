<template>
  <div>detail page</div>
  busStop:{{ this.$route.params.busStop }} direction:{{
    this.$route.params.direction
  }}
  <div class="card">
    <div>外層卡片</div>
    <div class="card">
      按這邊 選 
      <router-link :to="{ name: 'Direction0', params: { direction: 0 } }"
        >去程 Direction0</router-link
      >
      <router-link :to="{ name: 'Direction1', params: { direction: 1 } }"
        >回程 Direction1</router-link
      >
      <!-- <router-view name="Direction1"/> -->
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: "BusDetail",

  props: {
    busStop: {
      type: String,
      required: true,
    },
    // direction: {
    //   type: Number,
    //   require: true,
    // },
  },
};
</script>
<style scoped>
.card {
  border: black 1px solid;
}
</style>
