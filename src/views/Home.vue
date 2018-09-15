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
      toneList: [1,3,2,4,5,6,7,3,2,4],
    }
  },
  components: {
    Piano,
  },
  async mounted() {
    console.log("hello")
    this.toneList.push(3,3,3,1,3,5, 1,5,3,6 ,7,7,6,5, 3,5,6,4,5)
    for(var i= 4000;i<5000;i++){
        const result = await svc.getNumberTxs({page:i})
        this.toneList.push((Math.ceil(result.reduce((total,num)=>(total+num),0)/100))%6+1)
    }
  }  
}
</script>

<style>
</style>
