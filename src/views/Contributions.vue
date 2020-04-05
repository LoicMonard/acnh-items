<template>
  <div 
    class="contributions"
    v-if="user.email == 'fibredeneige91@gmail.com'">
    <h2>Contributions</h2>
    <div 
      class="contribution"
      v-for="contribution in contributions"
      :key="contribution.name">
      <img :src="contribution.image">
      <div>
        <span>Type: {{ contribution.type }}</span>
        <span>Nom: {{ contribution.name }}</span>
        <span>Prix: {{ contribution.price }}</span>
        <span>Obtention: {{ contribution.obtention }}</span>
        <span>Taille: {{ contribution.size }}</span>
      </div>
      <div>
        <span 
          v-for="item in contribution.recipeItems"
          :key="item.name">
          {{ item.name }} x {{ item.quantity }}
        </span>
      </div>
      <div class="actions">
        <button 
          class="filled"
          @click="validateContribution(contribution)">
          Accepter
        </button>
        <button @click="rejectContribution(contribution)">
          Rejeter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase/firebase'

export default {
  name: 'contributions',
  data: () => ({
    contributions: []
  }),
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    rejectContribution(contribution) {
      let that = this;
       db.collection('contributions')
        .doc(contribution.id)
        .delete()
        .then(doc => {
          const index = that.contributions.indexOf(contribution);
          that.contributions.splice(index, 1);
          
        });
    },
    validateContribution(contribution) {
      let that = this;
      db.collection('items')
        .add(contribution)
        .then(doc => {
          that.rejectContribution(contribution);
        });
    }
  },
  mounted() {
    let documents = [];
    let that = this;
    db.collection("contributions")
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id } ))
        that.contributions = documents;
      })
  }
}
</script>

<style scoped lang="scss">
.contributions {
  width: 100%;
  .contribution {
    display: flex;
    justify-content: space-between;
    padding: 14px;
    box-sizing: border-box;
    box-shadow: 0px 5px 15px -10px;
    img {
      width: 110px;
      height: 110px;
    }
    div {
      display: flex;
      flex-direction: column;
    }
    .actions button {
      margin: 5px 0;
    }
  }
}
</style>