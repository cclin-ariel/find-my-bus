<template>
    <div class="fixed-top">
        <Header />
    </div>
    
    <!-- start of searching keywords -->
    <div class="container-fluid pt-5">
        <div class="search-title text-center text-bldBlack Noto-Serif">
            <span class="text-bldGreen">{{ searchKeyRouteName }}</span> 的公車路線搜尋結果
        </div>
    </div>
    <!-- end of searching keywords -->
    
    
    <!-- start of search result list -->
    <div class="search-result text-center row">
        <ul>
            <li v-for="route in resultRoutes" :key="route.RouteID">
                <button class="search-btn btn btn-white text-bldBlack Noto-Serif px-2 col" @click="updateRouteToDetail(route)">
              {{ route.RouteName.Zh_tw }}
            </button>
            </li>
        </ul>
    </div>
    <!-- end of search result list -->
    
    <Footer />
</template>

<script>
import jsSHA from "jssha";

import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
    name: "SearchResult",
    components: { Header, Footer },
    props: {
        // form landing page
        routeName: {
            required: true,
        },
    },
    data() {
        return {
            resultRoutes: [], //search result from landing page
            searchKeyRouteName: "", // search key words from landing page
            routeNameToDetail: "none", //send to BusDetail page by router
        };
    },
    created() {
        this.searchKeyRouteName = this.routeName;
        this.getBusRoutes();
    },
    methods: {
        getBusRoutes() {
            const vm = this;
            const axios = require("axios");
            const busRoutesAPI = `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/Taoyuan/${vm.searchKeyRouteName}?$format=JSON`;

            axios
                .get(busRoutesAPI, {
                    headers: vm.getAuthorizationHeader(),
                })
                .then((response) => {
                    vm.resultRoutes = response.data;
                    console.log(vm.resultRoutes);
                })
                .catch(function(error) {
                    console.log(error);
                });

            this.getAuthorizationHeader();
        },
        updateRouteToDetail(route) {
            const routeIdToDetail = route.RouteID;
            this.routeNameToDetail = route.RouteName.Zh_tw;
            this.$router.push({
                name: "BusDetail",
                params: {
                    routeID: routeIdToDetail,
                    routeName: this.routeNameToDetail,
                },
            });
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
