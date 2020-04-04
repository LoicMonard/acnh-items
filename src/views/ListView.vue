<template>
  <div class="list-view">
    <ItemList/>
  </div>
</template>

<script>
import ItemList from '@/components/ItemList.vue'

export default {
  name: 'list-view',
  components: {
    ItemList
  }
}
</script>