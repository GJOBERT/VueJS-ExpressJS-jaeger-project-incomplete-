<template lang="html">
  <div class="">

    <v-snackbar
    top
    v-model="snackbar_toggle"
    >
    {{ snackbar_text }}

    <template v-slot:action="{ attrs }">
      <v-btn
      color="pink"
      text
      v-bind="attrs"
      @click="snackbar_toggle = false"
      >
      Close
    </v-btn>
    </template>
    </v-snackbar>

<span class="text-h5 font-weight-thin">
  Nombre de livres empruntés : {{this.current_cart.length}}
</span>
<span v-if="nombre_de_livres_en_retard" class="text-h5 red--text font-weight-bold">
 | Nombre de livres en retard : {{this.nombre_de_livres_en_retard}}
</span>

<div class="no_books" v-if="!current_cart.length" >
  <p class="text-h4 font-weight-thin mt-5 purple--text ">
   Vous n'avez emprunté aucun livre pour le moment...
  </p>
  <img src="https://media.giphy.com/media/JEhCPFfqi2Hy8/source.gif" class="no_books_picture" alt="">
  <p class="text-h6 font-weight-thin">
  Attention, vous risquez de devenir inculte!
  </p>

</div>





<div  class="action_grid" >

<SpecialCard
v-for="item in current_cart"

:key="item.id"
v-bind:target_id="item.id"
@item-rendu-from-card="reload"
@card-tweet="handleTweet"
></SpecialCard>

</div>

</div>
</template>

<script>
import jagAPI from '@/api/jagAPI.js'
export default {

  name:"CartView",
  components:{
      SpecialCard: () => import('@/views/bibliothecaire/lecteurs/general/components/SpecialCard.vue')
  },
  props:['target_id'],
  data(){
    return{
      snackbar_toggle:false,
      snackbar_text:'',
      current_cart:'',
      nombre_de_livres_en_retard:'',

    }
  },

  computed:{


  },

  mounted(){
    console.log("Cartview has been called with target_id " + this.target_id);

    this.fetchCart(this.target_id)

  },

  methods:{
    async getLivresEnRetards(){
      let results_raw =  await jagAPI.getCountRetardsById(this.$store.state.token, this.target_id)
      this.nombre_de_livres_en_retard = results_raw.results.length
    },

    async handleTweet(message){
      this.snackbar_text=message;
      this.snackbar_toggle=message;
    },

    async fetchCart(id){

      const response = await jagAPI.getCart(this.$store.state.token, id)
      this.current_cart = response.results
      this.getLivresEnRetards()

    },

    reload(){
      console.log("CartVue | Attempting to restore catalog");
      this.fetchCart(this.target_id)

      this.$emit('please-refresh', this.target_id)
    },




  }


}
</script>

<style lang="css" scoped>
.action_grid{
  /* background-color: gold; */
  margin-top:20px;
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}

.no_books_picture{
  object-fit:cover;
  max-height:300px;
  width:100%;
  margin-bottom:0;
}
</style>
