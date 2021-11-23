<template>
<Header/>

     result page
    <div>
        <router-link :to="{
              name: 'BusDetail',
              params: { routeName: this.routeNameToDetail ,busStop: this.busStopToDetail,direction: this.directionToDetail},
            }">
            result --> {{ this.$route.params.routeName }}</router-link>
        <!-- direction: this.directionToDetail -->
    </div>
</template>

<script>
import Header from "./Header.vue";


export default {
    name: "SearchResult",
  components: { Header },

    data() {
        return {
            routeNameToDetail: "",

            busStopToDetail: "fourthStop",
            directionToDetail: 0,
        };
    },
    created() {
        this.routeNameToDetail = this.$route.params.routeName
    },

};
</script>
