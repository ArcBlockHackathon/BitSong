<template>
  <section>
    <img src="../assets/logo.png" alt="logo">
    <piano></piano>
  </section>
</template>

<script>
import Piano from '../components/Piano.vue';

export default {
  name: 'Home',
  components: {
    Piano,
  },
  mounted() {
    console.log('112233');
  }
}
</script>

<style>
</style>
