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
    this.nextToneList=[3,3,3,1,3,5, 1,5,3,6 ,7,7,6,5, 3,5,6,4,5]
    for(var i= 200;i<250;i++){
      let nextToneList = new Array()
      for(var j=0;j<20;j++){
        const result = await svc.getNumberTxs({page:i*20+j})
        nextToneList.push((Math.ceil(result.reduce((total,num)=>(total+num),0)/100))%6+1)
      }
      console.log("result:",nextToneList)
      this.toneList = nextToneList
    }
  }  
}
</script>

<style>
</style>
