<template>
  <div class="items">
    <h1>Items</h1>
    <div
      v-for="document in documents"
      :key="document.name">
      {{ document.name }}
    </div>
  </div>
</template>

<script>
import { db } from '../firebase/firebase.js'

export default {
  name: 'items',
  data: () => ({
    documents: []
  }),
  created() {
    console.log('App created');
    let that = this;
    db.collection("items").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
        that.documents.push(doc.data())
      });
    });
  }
}
</script>

<style lang="scss" scoped>

</style>