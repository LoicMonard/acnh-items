<template>
  <div class="item">
    <div class="card">
      {{ data.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'item',
  props: [ 'data' ]
}
</script>

<style lang="scss" scoped>
.item {
  margin: 10px;
  display: flex;
  width: 200px;
  height: 200px;
  .card {
    width: 100%;
    padding: 12px;
    box-shadow: 9px 7px 40px -6px 
  }
}
</style>