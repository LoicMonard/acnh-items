<template>
  <div class="list-view">
    <ItemList 
      mode="list"/>
  </div>
</template>

<script>
import ItemList from '@/components/ItemList.vue'

export default {
  name: 'list-view',
  components: {
    ItemList
  },
  data: () => ({
    selectedList: ''
  }),
  computed: {
    lists() {
      if (this.$store.state.lists.length) {
        return this.$store.state.lists;
      }
    },
    user() {
      return this.$store.state.user;
    },
    currentList() {
      return this.$store.state.currentList;
    },
  },
}
</script>

<style lang="scss" scoped>
.list-view {
  h3 {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      height: 24px;
      margin-right: 4px;
    }
  }
  .lists {
    display: flex;
    .list {
      display: flex;
      align-items: center;
      padding: 4px 0;
      i {
        margin-top: 2px;
        margin-right: 4px;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>