<template>
  <div class="item-list">
    <h1>Items</h1>
    <div class="items">
      <Item 
        v-for="item in items"
        :key="item.name"
        v-bind:data="item"
        @click.native="getItemDetails(item)"/>
    </div>
  </div>
</template>

<script>
import Item from '@/components/Item.vue'
import { db } from '../firebase/firebase.js'
import router from 'vue-router'
import { mapGetters } from 'vuex'

export default {
  name: 'items',
  components: {
    Item
  },
  data: () => ({
  }),
  computed: {
    items() {
      return this.$store.state.items;
    }
  },
  methods: {
    getItemDetails(item) {
      console.log('click')
      this.$router.push({ name: 'details', params: item})
    }
  },
}
</script>

<style lang="scss" scoped>
.item-list {
  width: 100%;
  .items {
    display: flex;
  }
}
</style>