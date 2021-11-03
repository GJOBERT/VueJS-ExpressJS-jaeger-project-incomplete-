<template lang="html">
<keep-alive>
  <v-card class="mx-auto  cardz">
<router-link :to="{ name: 'Page_livre', params: {id:target_id} }">
<div class="image_container">
    <img v-if="!is_image_loading"
    v-bind:src="current_image_src"
    class="card_photo"
    >

    <v-progress-circular
    v-if="is_image_loading"
    indeterminate
    size="150"
    color="primary"
  ></v-progress-circular>

   </div>
    </router-link>

    <v-card-title>
      <div>
        <span class="grey--text">{{target_book.author}}</span><br>
        <span>{{target_book.title}}</span><br>
        <span class="font-weight-thin">{{target_book.year}}</span><br>

      </div>
    </v-card-title>

    <v-card-text class="mt-2 pa-0">
      <div class="">
        <v-btn
        v-if="diffDays >= 0"
        text
        x-small
        color='success'>
        A rendre dans {{this.diffDays}} jours
        </v-btn>

        <v-btn
        v-if="diffDays < 0"
        text
        small
        color='error'>
        En retard de {{-1 * this.diffDays}} jours
        </v-btn>

      </div>

    </v-card-text>



    <v-card-actions>
      <router-link :to="{ name: 'Page_livre', params: {id:target_id} }">
        <v-btn
        color="light-blue accent-3"
        small
        dark
        >
        Voir
        <v-icon class="ml-2">visibility</v-icon>
      </v-btn>
    </router-link>


    <v-btn
    color="blue-grey darken-4"
    @click="rendre"
    small
    dark
    class="ml-2"
    >
    Rendre
    <v-icon class="ml-2">check_circle</v-icon>
  </v-btn>



<v-spacer></v-spacer>

</v-card-actions>

</v-card>

</keep-alive>

</template>

<script>
import jagAPI from '@/api/jagAPI.js'
export default {
  name:'SpecialCard',

  props:['target_id'],

  data(){
    return{

      target_book:{},
      jours_de_retard:{},

      current_image_src:'',
      is_image_loading:true,
    }
  },

  computed:{
    disponibilite(){
      if(this.target_book.borrowed_by === "0"){
        return "disponible"
      }else{
        return "indisponible"
      }
    },

    diffDays(){
      let date_de_retour = new Date(this.target_book.date_end)
      let today = new Date()
      let diffTime = date_de_retour.getTime() - today.getTime()
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));



      return diffDays

    },

    isRetard(){

      if(this.diffDays<0){

        return true

      }else{
        return false
      }
    }

  },

  mounted(){
    this.fetchCurrentBook(this.target_id);


  },



  methods:{

    async fetchCurrentBook(id){
      let book_details_raw =  await jagAPI.getSingleBookDetails(id);
      this.target_book = await book_details_raw.result[0];


      var base64data = Buffer.from(await this.target_book.image);
      this.current_image_src = await base64data
      this.is_image_loading=false;
      this.current_image_base64 = base64data;


    },


    async rendre(){
      await jagAPI.rendreBook(this.$store.state.token, this.target_id)
      this.$emit('item-rendu-from-card', this.target_id)
      this.$emit('card-tweet',this.target_book.title + " a été rendu avec succès")
      this.$forceUpdate();
    },






  }



}
</script>

<style lang="css" scoped>
.cardz{
  width:100%;
}
.v-card__title{
  word-break: normal;
  font-size:0.85em;
  line-height: 1rem;
  height:64px;

}

.card_photo{
  width:100%;
  height:100%;
  object-fit:contain;
  background-color:black;
}


.card_photo_placeholder{
  width:100%;
  height:100%;
  object-fit:cover;
  background-color:black;
}


.spinner{


}

.image_container{
  width:100%;
  height:200px;
  display:flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;

  padding:2%;
  background-color:black;
}
</style>
