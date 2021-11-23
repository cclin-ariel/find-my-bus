<template>
  <router-link
    :to="{
      name: 'BusDetail',
      params: { routeName: this.routeName },
      props: { busStop: this.busStop },
    }"
  >
    check bus detail</router-link
  >
</template>
<script>
import { defineComponent } from "vue";
import { useRoute } from "vue";

export default defineComponent({
  name: "SearchResult",

  data() {
    return {
      routeName: "",

      busStop: "fourthStop",
      direction: 0,
    };
  },
  setup() {
    const route = useRoute();
    this.RouteName = route.query;
  },
});
</script>
