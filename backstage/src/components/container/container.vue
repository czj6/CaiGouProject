<template>
  <div class="container">
    <div class="headSection">
      <slot name="headSection"></slot>
      <slot name="contentBox"></slot>
      <slot name="footerSection"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'container'
}
</script>

<style>
.container{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 60px;
  margin-left: 200px;
}
</style>
