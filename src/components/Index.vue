<template>
  <div>index</div>
  <!-- <router-link :to="{ name: 'SearchResult', params: { routeName: this.routeName } }"
    >get your search result</router-link
  > -->
  <router-link to="{ name: 'SearchResult'}"
    >get your search result</router-link
  >
</template>
<script>
import {defineComponent} from 'vue'
// import {useRoute, useRouter} from 'vue'
export default defineComponent({
    name:'Index',
  data() {
    return {
      routeName: '623',
    };
  },
//   setup() {
//       const route = useroute()
//       let 
//   }
}
);
</script>
