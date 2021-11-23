<template>
  <div>detail page</div>
  busStop:{{busStop}}
  direction:{{direction}}
</template>
<script>
export default {
        name:'BusDetail',

  props: {
    busStop: {
      type: String,
      required: true,
    },
    direction: {
      type: Number,
      require: true,
    },
  },
};
</script>
