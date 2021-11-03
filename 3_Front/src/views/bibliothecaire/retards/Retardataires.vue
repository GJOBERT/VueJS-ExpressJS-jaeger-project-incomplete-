<template lang="html">
<div class="main_container">
  <div class="headerblock">
    <span class="text-h2 font-weight-thin">Livres</span><span class="text-h2 font-weight-bold"> en retard</span><br>
    <span class="text-h4 font-weight-bold">Liste de tous les livres manquants</span>
  </div>

  <div v-if="count_retard" class="nice_stats mb-5 ">
    <v-chip
      color="pink"
      label
      text-color="white"
      class="mr-5"
      > <v-icon left>
        mdi-label
      </v-icon>{{this.count_retard}} livre(s) en retard</v-chip>

      <v-chip
        color="blue"
        label
        text-color="white"> <v-icon left
        class="mr-5"
        >
          mdi-label
        </v-icon>Soit {{this.percentage_late}}% du catalogue</v-chip>


        <v-chip
          color="orange"
          label
          text-color="white"
          class="ml-5"
          > <v-icon left

          >
            mdi-label
          </v-icon>{{this.average_retard}} jours de retard en moyenne </v-chip>

  </div>

  <div v-if="!count_retard" class="congratulations mt-10">
    <span class="animate__animated animate__fadeInUp text-h4 purple--text font-weight-thin ">Félicitations {{this.$store.state.user.firstname}} !</span>
    <img src="https://media.giphy.com/media/g9582DNuQppxC/source.gif" class="animate__animated animate__fadeIn mt-5 mb-5">
    <span class="text-h5 animate__animated animate__fadeInUp ">Vous n'avez aucun retard à déclarer sur votre bibliothèque !</span>
    <span class="text-h6 animate__animated animate__fadeInUp ">Vos {{this.count_users}} usagers sont exemplaires !</span>
    <span class="text-subtitle-1 animate__animated animate__fadeInUp ">Le contribuable vous en remercie 💕!</span>
  </div>
<div class="action_list">
  <RetardataireCard
  v-for="item in list_of_retards"
  :key="item.id"
  v-bind:target_book_id="item.id"
  v-bind:jours_de_retard="item.jours_de_retard"
  v-bind:user="item.borrowed_by"
  @rendre-request="rendre">

</RetardataireCard>

</div>

</div>
</template>

<script>
import RetardataireCard from "@/views/bibliothecaire/retards/components/RetardataireCard.vue"
import jagAPI from "@/api/jagAPI.js"

export default {
  name:"Retardataires",
  components:{
    RetardataireCard,

  },
  data(){
    return{
      list_of_retards:[],
      average_retard:'',
      count_retard:'',
      library_count:'',
      percentage_late:'',
      count_users:'',


    }
  },

  mounted(){
  this.fetchAllRetards()
  this.getRetardMoyen();
  this.getRetardNombre();
  this.getPercentageLate();
  this.getUsersNombre();
  },

  methods:{
    async fetchAllRetards(){
      let list_of_retards_raw = await jagAPI.getAllRetards(this.$store.state.token)
      this.list_of_retards = list_of_retards_raw.results

    },

    async rendre(id){
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
      await jagAPI.borrowBook(this.$store.state.token, id, payload )

      this.fetchAllRetards(this.target_id)
      this.getRetardMoyen();
      this.getRetardNombre();
      this.getPercentageLate();
      this.getUsersNombre();
    },

    async getRetardMoyen(){
      let average_retard_raw = await jagAPI.getAverageRetards(this.$store.state.token)
      this.average_retard = average_retard_raw.results[0].moyenne;
    },

    async getRetardNombre(){
      let count_retard_raw = await jagAPI.getCountRetards(this.$store.state.token)
      this.count_retard = count_retard_raw.results[0].nombre;
    },

    async getPercentageLate(){
      let library_count_raw = await jagAPI.getCountAllBooks(this.$store.state.token)
      this.library_count = library_count_raw.results[0].nombre;
      this.percentage_late = (100*this.count_retard / this.library_count).toFixed(2)
    },

    async getUsersNombre(){
      let count_users_raw = await jagAPI.getCountAllUsers(this.$store.state.token)
      this.count_users = count_users_raw.results[0].nombre;
    }


  }



}
</script>

<style lang="css" scoped>
.main_container{
  width:90%;
  margin-left:auto;
  margin-right:auto;
  /* background-color:rebeccapurple; */
  display:flex;
  flex-direction: column;
}
.headerblock{
  dispaly:flex;
  flex-direction: column;
}
.action_list{
  display:flex;
  flex-direction: column;
}

.congratulations{
  display:flex;
  flex-direction: column;
}

.congratulations > img {
  max-height:400px;
  object-fit:cover;
}

</style>
