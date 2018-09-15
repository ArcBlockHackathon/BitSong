<template>
  <section>
    <piano :tone-list="toneList"></piano>
  </section>
</template>

<script>
import Piano from '../components/Piano.vue';
import svc from '../services/transactions.js'
export default {
  name: 'Home',
  data(){
    return {
      toneList: [],
      maxTxs:1000,
    }
  },
  methods:{
    getSpeed(speed,txs,lastTxs){
    if(txs > lastTxs){
      speed -= 50
    }else {
      speed += 50
    }
    if(speed < 200){
      return 200
    }
    if(speed  > 500){
      return 500
    }
    return speed
  },
    getTone(Txs){
    if(Txs > this.maxTxs){
      this.maxTxs = Txs
      return 11
    }else {
      let rate = Txs/this.maxTxs
      return Math.floor((rate-0.5)*20)
    }
    },
  },
  
  components: {
    Piano,
  },
  async mounted() {
    console.log("hello")
    //this.toneList.push(3,3,3,1,3,5, 1,5,3,6 ,7,7,6,5, 3,5,6,4,5)
    let lastTxs = 1000
    let lastSpeed = 400
    for(var i= 4000;i<5000;i++){
        const result = await svc.getNumberTxs({page:i})
        const Txs = Math.ceil((result.reduce((total,num)=>(total+num),0))/100)
        lastSpeed = this.getSpeed(lastSpeed,Txs,lastTxs)
        this.toneList.push({tone:this.getTone(Txs),speed:lastSpeed})
        console.log("data:",{tone:this.getTone(Txs),speed:lastSpeed})
    }
  }  
}
</script>

<style>
</style>
