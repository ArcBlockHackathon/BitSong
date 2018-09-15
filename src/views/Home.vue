<template>
  <section>
    <simple-header>BitSong</simple-header>
    <piano :tone-list="toneList"></piano>
    <chart :data="toneList" />
  </section>
</template>

<script>
import Piano from '../components/Piano.vue';
import Chart from '../components/Chart.vue';
import transactionSvc from '../services/transactions';
import SimpleHeader from '../components/SimpleHeader.vue';

export default {
  name: 'Home',
  data(){
    return {
      toneList: [1,3,2,4,5,6,7,3,2,4],
    }
  },
  components: {
    Piano,
    Chart,
    SimpleHeader,
  },
  async mounted() {
    this.toneList.push(3,3,3,1,3,5, 1,5,3,6 ,7,7,6,5, 3,5,6,4,5);
    for(var i= 4000;i < 5000;i++){
      const result = await transactionSvc.getStat({ page:i });
      this.toneList.push((Math.ceil(result.avg / 100)) % 6 + 1);
      console.log(this.toneList);
    }
  }
}
</script>

<style>
</style>
