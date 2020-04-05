<template>
  <div class="list-view">
    <div 
      class="lists"
      v-if="user.email">
      <h3><img src="../assets/item.png">Mes listes</h3>
      <div 
        class="list"
        v-for="list in lists"
        :key="list.name">
        <i 
          class="material-icons"
          @click.prevent="pickList(list)"
          v-if="list.name == selectedList.name">
          radio_button_checked
        </i>
        <i 
          class="material-icons"
          @click.prevent="pickList(list)"
          v-else>
          radio_button_unchecked
        </i>
        <span class="list-name">
          {{ list.name }}
        </span>
      </div>
    </div>
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
  methods: {
    pickList(list) {
      this.selectedList = list;
      this.$store.dispatch('setCurrentList', list)
    }
  }
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