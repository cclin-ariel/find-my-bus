<template>
    <div>
        index</div>
    <router-link :to="{ name: 'SearchResult', params: { routeName: this.routeName } }">get your search result</router-link>

</template>

<script>
export default {
    name: 'Index',
    data() {
        return {
            routeName: '623',
        };
    },

};
</script>
