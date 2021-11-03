<template lang="html">
<div class="main-card">

  <img class="Book_illustration" v-bind:src="book_image_preview_url">

  <div class="book_info">
    <span class="text-subtitle-2 font-weight-bold ">{{this.target_book.author}}</span>
    <span class="text-h6 font-weight-thin">{{this.target_book.title}}</span>

    <div class="book_info_bottom_row">
      <span class="font-weight-bold">ISBN</span>
      <span class="font-weight-thin">{{this.target_book.isbn}}</span>
      <span class="font-weight-bold">Cote</span>
      <span class="font-weight-thin">{{this.target_book.cote}}</span>
    </div>
  </div>
  <img class="Book_illustration" v-bind:src="user_image_preview_url">

  <div class="emprunteur_info">
    <span class="text-subtitle-2 font-weight-bold  ">N° de carte : {{this.target_user.card_id}} </span>

    <div class="emprunte_par">
      <span class="text-subtitle-2 font-weight-thin  ">Emprunté par</span><span class="text-h6  ">{{this.target_user.firstname+" "+this.target_user.lastname  }}</span>
    </div>

    <div class="book_info_bottom_row ">
      <span class="text-caption font-weight-bold">Email</span>
      <span class="text-caption font-weight-thin green--text">{{this.target_user.email}}</span>
      <span class="text-caption font-weight-bold">Status</span>
      <span class="text-caption font-weight-thin">{{this.target_user.isAdmin? "Lecteur":"Bibliothécaire"}}</span>
    </div>



  </div>


  <div class="presentoir_retard">
    <span class="text-h4">{{this.jours_de_retard}}</span><br>
    <span class="text-subtitle-1">jours de retard </span><br>
    <span class="text-subtitle-2 font-weight-thin">Devait être rendu le  </span>
    <span class="text-subtitle-2 font-weight-bold">{{this.target_book.date_end}}</span>

  </div>

<div class="action_container">
  <v-btn text color="success" class="action_container_item" @click="rendreRequest">Rendre</v-btn>
  <v-btn text v-bind:href="relance_url" color="error" class="action_container_item">Relancer par mail</v-btn>

</div>

</div>
</template>

<script>
import jagAPI from "@/api/jagAPI.js"
export default {
  name:"RetardataireCard",
  props:[
    "target_book_id",
    "jours_de_retard",
    "user"],

  data(){
    return{
      target_book:{},
      target_user:{},
      book_image_preview_url:'',
      relance_url:'',
    }
  },

  mounted(){
    this.fetchCurrentBook(this.target_book_id)
    this.getUserInfo(this.user);

  },

  methods:{
    //Récupérer toutes les données du livre cible
    async fetchCurrentBook(id){
      const book_details_raw = await jagAPI.getSingleBookDetails(id);
      this.target_book = book_details_raw.result[0];
      this.book_image_preview_url = Buffer.from(this.target_book.image);
      this.prepareRepoURL();
    },

    //Récupérer toutes les données de l'utilisateur cible
    async getUserInfo(id){
      const user_details_raw =  await jagAPI.getUserDetailsSpecial(id, this.$store.state.token,);
      const user_details = user_details_raw.result[0];
      this.target_user = user_details;
      this.user_image_preview_url = Buffer.from(this.target_user.avatar);
      this.prepareRepoURL();
    },
    //Demander au parent de rendre le livre
    async rendreRequest(){
      this.$emit('rendre-request',this.target_book_id)
    },

    //Préparer l'URL de relance de l'Email
    async prepareRepoURL(){
      let body_raw = "Chère "+ this.target_user.firstname + "," + "%0A" + "Voila "+this.jours_de_retard +" jours que vous deviez nous rendre le livre suivant : %0A" + this.target_book.title +".%0A"+"Veuillez le ramenez dès que possible à la Bibliothèque Katy Perry.%0A Ce serait bête que d'autres utilisateurs ne puissent en profiter!%0ACordialement,%0AVotre Bibliothécaire"
      let body = body_raw.replace(" ", "%20");
      this.relance_url = 'mailto:'+this.target_user.email+'?subject=Bibliothèque%20Katy%20Perry%20|%20Livres%20en%20Retard&body='+body;
      console.log("Repo URL cooked : " + this.relance_url);
      // mailto:username@example.com?subject=Subject&body=message%20goes%20here

    }
  }
}
</script>

<style lang="css" scoped>
.main-card{
  display:flex;
  flex-direction: row;
  width:100%;
  /* background-color:rgb(240, 36, 146); */
  margin-bottom:20px;
  box-shadow :  2px 2px 2px 2px #ccc;
  padding:0;

}
.Book_illustration{
  height:100px;
  width:100px;
  object-fit:cover;
  min-width:100px;
}

.book_info{
  display:flex;
  flex-direction: column;
  /* background-color:gold; */
  width:25%;
  flex-shrink:0;

  padding:10px;
}

.book_info_bottom_row{
  display:flex;
  flex-direction: row;

  column-gap:5px;
}

.emprunteur_info{
  display:flex;
  flex-direction: column;

  width:25%;
  padding:10px;
}

.emprunte_par{
  display:flex;
  flex-direction: row;
  column-gap:5px;
  align-items:baseline;
}

.presentoir_retard{
  height:100px;
  width:20%;
  flex-direction: column;
  background-color:rgb(28, 22, 28);
  justify-content: center;
  padding:5px;
  color:white;
}

.action_container{
  display:flex;
  flex-direction: column;
  flex-grow:1;
}

.action_container_item{
  flex-grow:1;
  padding:5px;
}
</style>
