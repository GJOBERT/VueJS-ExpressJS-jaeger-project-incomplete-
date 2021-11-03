<template lang="html">
<keep-alive>
  <v-card class="mx-auto cardz">
<router-link :to="{ name: 'Page_livre', params: {id:target_id} }">
<div class="photoblock">
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

    <v-card-title class="titleblock">
      <div>
        <span class="grey--text">{{target_book.author}}</span><br>
        <span class="h4--text">{{target_book.title}}</span><br>
        <span class="font-weight-thin">{{target_book.year}}</span><br>

      </div>
    </v-card-title>
<!--
    <v-card-text class="mt-2 textblock">
      <div class="">

      </div> -->

    <!-- </v-card-text> -->

    <v-card-actions class="actionblock">
      <router-link :to="{ name: 'Page_livre', params: {id:target_id} }">
        <v-btn
        color="green lighten-2"
        icon

        >
        <v-icon>visibility</v-icon>
      </v-btn>
    </router-link>

    <router-link :to="{ name: 'Modify_livre', params: {id:target_id} }">
      <v-btn
      color="blue lighten-2"
      icon
      >
      <v-icon>create</v-icon>
    </v-btn>
    </router-link>

    <v-btn
    color="red lighten-2"
    icon
    @click="remove"
    >
    <v-icon>delete_sweep</v-icon>
    </v-btn>

    <v-btn
    v-if="!target_book.is_borrowed"
    color="orange lighten-2"
    icon
    @click="borrowBook"
    >
    <v-icon>add_shopping_cart</v-icon>
  </v-btn>

    <v-btn
    v-if="target_book.is_borrowed===1"
    color="orange lighten-2"
    text
    outlined
    small
    @click="borrowBook"
    >
    Emprunté
    </v-btn>





<v-spacer></v-spacer>

</v-card-actions>

</v-card>

</keep-alive>

</template>

<script>
import jagAPI from '@/api/jagAPI.js'
export default {
  name:'Component_card',

  props:['target_id'],

  data(){
    return{

      target_book:{},
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
    }

  },

  mounted(){
    this.fetchCurrentBook(this.target_id);
    // console.log("Cardizer: called with book_id #"+this.target_id);
    // console.log("Cardizer : Details retrieved: ");
    // console.log(this.target_book);
  },

  methods:{

    async borrowBook(){
      let today = new Date()
      let date_de_retour = new Date()
      date_de_retour.setDate(date_de_retour.getDate() + 80)
      let payload = {
        is_borrowed:'',
        date_begin:'',
        date_end:'',
        borrowed_by:''
      }
      payload.is_borrowed=1;
      payload.date_begin=today.toISOString().split('T')[0];
      payload.date_end = date_de_retour.toISOString().split('T')[0];
      payload.borrowed_by = this.$store.state.user.card_id;
      await jagAPI.borrowBook(this.$store.state.token, this.target_book.id, payload )
      this.fetchCurrentBook(this.target_id)

      this.$emit('snack-tweet',"Félicitations, ce livre est à vous pour 80 jours!")
    },

    async fetchCurrentBook(id){
      // let book_details_raw =  await jagAPI.getSingleBookDetails(id);
      // this.target_book = await book_details_raw.result[0];
      // this.current_image_src  = await Buffer.from( this.target_book.image);
      // this.is_image_loading=false;

      jagAPI.getBook(id)
        .then((response) => {
          this.target_book = response[0];
          this.current_image_src = Buffer.from(this.target_book.image);
          this.is_image_loading = false;
        })
        .catch(err => console.log(err));
    },

    async remove(){
      jagAPI.getBook(this.target_id)
      if(this.target_book.is_borrowed==='0' || this.target_book.is_borrowed===0){
        
        this.$emit('item-deleted-from-card', this.target_book.id )
      }else{
        this.$emit('snack-tweet', "Vous ne pouvez pas supprimer un livre en cours d'emprunt. Rendez-le d'abord.")
      }
    },



  }



}
</script>

<style lang="css" scoped>
.cardz{
  width:100%;
  height:300px;


  animation: fadeIn; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s; /* don't forget to set a duration! */
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

.photoblock{
  width:100%;
  height:50%;
  display:flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;

  padding:2%;
  background-color:black;
}

.titleblock{
  display:flex;
  height:35%;
  flex-direction: column;
  justify-content: flex-start;
  align-items:flex-start;


}

.textblock{

  display:flex;
  height:0%;
  flex-direction: column;
  justify-content: flex-start;

}

.actionblock{
  height:15%;
  background-color: rgb(19, 19, 18);


}
</style>
