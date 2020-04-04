<template>
  <div class="list-view">
    Listview
    <ItemList mode="list"/>
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