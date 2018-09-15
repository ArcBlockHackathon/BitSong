<template>
  <h1 class="m-header">
    <slot></slot>
  </h1>
</template>

<script>
export default {
  name: 'SimpleHeader',
}
</script>

<style>
  .m-header{
    height: 60px;
    line-height: 60px;
    font-size: 40px;
    font-weight: normal;
    text-align: Center;
    background-color: #fff;
    color: #333;
    border-bottom: 1px solid #eee;
  }
</style>
