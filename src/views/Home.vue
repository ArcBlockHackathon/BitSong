<template>
  <section>
    <piano :tone-list="toneList"></piano>
  </section>
</template>

<script>
import Piano from '../components/Piano.vue';

export default {
  name: 'Home',
  data(){
    return {
      toneList: [1,3,2,4,5,6,7,3,2,4],
    }
  },
  components: {
    Piano,
  },
}
</script>

<style>
</style>
