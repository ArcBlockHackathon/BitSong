<template>
  <section class="m-piano">
    <button class="playBtn" @click="play">点击播放</button>
  </section>
</template>

<script>
import Paino from '../utils/paino.js';

const painoInstance = new Paino();

export default {
  name: 'Piano',
  data() {
    return {
      currentToneList: this.toneList,
    };
  },
  props: {
    toneList: {
      required: !0,
      type: Array
    }
  },
  methods: {
    play() {
      let index = 0;
      let self = this;
      play();

      function play() {
        if(index < self.currentToneList.length){
          const tone = self.currentToneList[index]
          self.$emit('tone', tone)
          painoInstance.play(tone);
          index++;
          setTimeout(()=>{
            play();
          }, 500)
        }       
      }

    }
  },
}
</script>

<style>
  .m-piano{
    text-align: center;
  }

  .m-piano .playBtn{
    border: none;
    outline: none;
    padding: 8px 25px;
    border-radius: 4px;
    height: 46px;
    color: #fff;
    background-color: #00dce6; 
  }
</style>
