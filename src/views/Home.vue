<template>
  <section>
    <simple-header>BitSong</simple-header>
    <piano :tone-list="toneList" v-on:tone="onTonePlay"></piano>
    <chart :data="playedToneList" />
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
      toneList: [],
      maxTxs:1000,
      playedToneList: Array(30).fill(0),
    }
  },
  methods:{
    onTonePlay(tone) {
      this.playedToneList.push(tone);
    },
    getSpeed(speed,txs,lastTxs){
      // if(txs > lastTxs){
      //   speed /= 2;
      // } else {
      //   speed *= 2;
      // }
      // return Math.max(Math.min(speed, 800), 100);
      return txs > lastTxs ? 200 : 400;
  },
    getTone(Txs){
    if(Txs > this.maxTxs){
      this.maxTxs = Txs
      return 11
    }else {
      let rate = Txs/this.maxTxs
      if(rate < 0.55){
        return 1;
      }
      return Math.floor((rate-0.5)*20)
    }
    },
  },  
  components: {
    Piano,
    Chart,
    SimpleHeader,
  },
  async mounted() {
    let lastTxs = 1000
    let lastSpeed = 400
    for(var i= 4000;i<5000;i++){
        const result = await transactionSvc.getNumberTxs({page:i})
        const Txs = Math.ceil((result.reduce((total,num)=>(total+num),0))/100)
        lastSpeed = this.getSpeed(lastSpeed,Txs,lastTxs)
        lastTxs = Txs;
        this.toneList.push({tone:this.getTone(Txs),speed:lastSpeed})
        // console.log("data:",{tone:this.getTone(Txs),speed:lastSpeed})
    }
  }
}
</script>

<style>
</style>
