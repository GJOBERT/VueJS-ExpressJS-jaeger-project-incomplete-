<template lang="html">

  <div class="main_container pa-5">

    <p class="display-3">Rechercher un lecteur</p>
    <p class="display-1 font-weight-thin">{{list_of_users.length}} utilisateurs inscrits au total</p>

    <div class="rack">
      <router-link :to="{ name: 'Add_lecteur', params: {} }">
        <v-btn  color="green" class="white--text pl-0"  text>
          Ajouter un utilisateur
          <v-icon right dark>person_add</v-icon>
        </v-btn>

      </router-link>

    </div>

    <v-tabs
   fixed-tabs>
   <v-tab>
     Lecteurs
   </v-tab>
   <v-tab-item>
     <SearchLecteurs/>
   </v-tab-item>
   <v-tab>
     Bibliothécaires
   </v-tab>
   <v-tab-item>
     <SearchBibliothecaires/>
   </v-tab-item>


 </v-tabs>



  </div>

</template>

<script>
  // import Trombinoscope_card from '@/views/bibliothecaire/lecteurs/general/components/Trombinoscope_card.vue'
  import SearchLecteurs from '@/views/bibliothecaire/lecteurs/general/components/SearchLecteurs.vue'
  import SearchBibliothecaires from '@/views/bibliothecaire/lecteurs/general/components/SearchBibliothecaires.vue'
  import jagAPI from '@/api/jagAPI.js'

  export default {

    name: 'Trombinoscope',

    beforeCreate(){
      console.log("RouteGuard has been called on Trombinoscope !");
      console.log("Current user state : " + this.$store.state.user);
      if(this.$store.state.user === null || this.$store.state.user.isAdmin === 0 ){
        this.$router.push("Unauthorized")
    }
  },

    components: {
      SearchLecteurs,
      SearchBibliothecaires,

    },

    data() {
      return {

        list_of_users:'',
        total_number_of_bibliothecaires:'',
        total_number_of_lecteurs:'',

      }
    },



      mounted(){
        this.receiveTrombinoscope();
      },

      methods:{
        async receiveTrombinoscope(){
          this.list_of_users_raw = await jagAPI.getListofAllUsers(this.$store.state.token);
          this.list_of_users = this.list_of_users_raw.results

          console.log("Received list of users");
          console.log(this.list_of_users);

        }
      }
    }


</script>

<style lang="css" scoped>

.main_container{
  width:95%;
  margin-left:auto;
  margin-right:auto;
  /* background-color:rebeccapurple; */
  display:flex;
  flex-direction: column;
}
.action_grid{
  /* background-color: gold; */
  margin-top:20px;
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
.SearchBar{
  /* background-color:gold; */
  display: flex;
  flex-direction: column;

  justify-content: space-between;
}
.SearchInput{
  margin-bottom:20px;
}
.filterbox{
  display:flex;
  flex-direction: row;
  column-gap: 20px;
  flex-wrap:wrap;
}
.filter{
  flex-basis:1/3;
}
.v-card__title{
  word-break: normal;
  font-size:0.85em;
  line-height: 1rem;
  height:64px;

}
.rack{
  display:flex;
  flex-direction: row;
  margin-bottom:20px;
}

</style>
