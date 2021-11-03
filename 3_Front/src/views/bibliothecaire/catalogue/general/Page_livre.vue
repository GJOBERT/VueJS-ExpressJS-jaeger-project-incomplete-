<template lang="html">
  <div class="main_container">

    <v-btn @click="goback" icon xx-large><v-icon>keyboard_backspace</v-icon></v-btn>
    <p class="display-1 font-weight-thin">Catalogue</p>
    <p class="display-3">{{target_book.title}}
      <router-link :to="{ name: 'Modify_livre', params: {id:target_id} }">
        <v-btn
        color="orange lighten-2"
        outlined
        >
        Modifier
        </v-btn>
      </router-link>
    </p>

    <div class="info_block">
          <div class="left_side">
            <img class="Book_illustration" v-bind:src="image_preview_url">




          </div>

          <div class="right_side">
            <v-text-field
            v-model="target_book.title"
            label="Titre du livre"
            disabled

            rounded
            class="font-weight-bold text-h5"

            >``</v-text-field>

    <div class="midway_rack">
      <v-text-field
      v-model="target_book.author"
      class="  purple--text font-weight-bold text-subtitle-1"
      prepend-inner-icon="border_color"
      label="Auteur"
      disabled


        rounded

      >``</v-text-field>


      <v-text-field
      v-model="target_book.category"
      label="Catégorie"
      prepend-inner-icon="category"
      disabled

      rounded
      class="font-weight-bold text-subtitle-2"

      >``</v-text-field>

      <v-text-field
      v-model="target_book.year"
      label="Année"
      prepend-inner-icon="schedule"
      disabled

      rounded
      class="font-weight-bold text-subtitle-2"

      >``</v-text-field>

      <v-text-field
      v-model="target_book.cote"
      label="Cote"
      disabled
      prepend-inner-icon="local_offer"

      rounded
      class="font-weight-bold text-subtitle-2"

      >``</v-text-field>

      <v-text-field
      v-model="target_book.isbn"
      label="isbn"
      disabled
      prepend-inner-icon="qr_code_2"

      rounded
      class="font-weight-bold text-subtitle-2"

      >``</v-text-field>
    </div>

    <div class="midway_rack2">
      <v-chip
          v-if="!target_book.is_borrowed"
          class="ma-2"

          color="teal"
          text-color="white"
        >
          <v-avatar @click="borrowBook" left>
            <v-icon>add_shopping_cart</v-icon>
          </v-avatar>
          Disponible à l'emprunt
        </v-chip>


        <v-chip
        v-if="target_book.is_borrowed"
        class="ma-2"
        color="orange"
        text-color="white"
      >
        Retour le {{this.target_book.date_end}}
        <v-icon right>
          mdi-star
        </v-icon>
      </v-chip>

      <v-chip
      v-if="target_book.is_borrowed"
      class="ma-2"
      color="green"
      text-color="white"
    >
      Rendre le livre
      <v-icon @click="rendre" right>
        mdi-star
      </v-icon>
    </v-chip>

    </div>
            <v-textarea
            outline
            name="input-7-4"
            label="Résumé"
            v-model="target_book.summary"
            prepend-inner-icon="assignment"
            disabled
            no-resize

            auto-grow
            rounded
            class="purple--text"

            ></v-textarea>


          </div>

        </div>




  </div>

</template>

<script>
import jagAPI from '@/api/jagAPI.js'
export default {
  name: 'Page_livre',
  data() {
    return {
      target_id: '',
      target_book:'',
      image_preview_url:'',

    }
  },
  mounted() {

    this.target_id = this.$route.params.id;
        console.log("Page livre called with id : " + this.target_id);
    this.fetchCurrentBook(this.target_id);

  },

  computed:{
    disponibilite(){
      if(this.target_book.borrowed_by === "0"){
        return "Disponible"
      }else{
        return "Indisponible"
      }
    },

  },

  methods:{
    goback(){
      this.$router.go(-1)
    },

    async fetchCurrentBook(id){
      const book_details_raw = await jagAPI.getSingleBookDetails(id);
      this.target_book = book_details_raw.result[0];

      this.image_preview_url = Buffer.from(this.target_book.image);
      console.log("Object status : ");
      console.log(this.target_book);
    },

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
      const borrow_request = await jagAPI.borrowBook(this.$store.state.token, this.target_book.id, payload )
      console.log("Page_livre | Requête d'emprunt envoyée! Réponse : ");
      console.log(borrow_request);

      this.fetchCurrentBook(this.target_id)
    },

    async rendre(){
      let payload = {
        is_borrowed:'',
        date_begin:'',
        date_end:'',
        borrowed_by:''
      }
      payload.is_borrowed=0;
      payload.date_begin='1000-01-01'
      payload.date_end = '1000-01-01'
      payload.borrowed_by = null;
      const borrow_request = await jagAPI.borrowBook(this.$store.state.token, this.target_book.id, payload )
      console.log("Page_livre | Requête de retour envoyée! Réponse : ");
      console.log(borrow_request);

      this.fetchCurrentBook(this.target_id)
    }
  }
}
</script>

<style lang="css" scoped>

.main_container{
  width:80%;
  margin-left:auto;
  margin-right:auto;
  /* background-color:rebeccapurple; */
  display:flex;
  flex-direction: column;
}

.info_block{
  /* background-color: gold; */
  margin-top: 20px;
  display:flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap:wrap;
  row-gap:20px;
  column-gap:20px;
}

.left_side{
  /* background-color: rebeccapurple; */
  flex-basis:20%;
  min-width:320px;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
}

.right_side{
  /* background-color: azure; */
  flex-basis:50%;
  flex-grow:1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height:60%;
}

.Book_illustration{
  width:100%;
  height:300px;
  background-color:black;
  object-fit:contain;
}

.loan_status{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  column-gap: 20px;
}

.midway_rack{
  display:flex;


  flex-direction: row;
  justify-content: flex-start;

}

.midway_rack2{
  display:flex;


  flex-direction: row;
  justify-content: flex-start;
}

</style>
