<template lang="html">

  <div class="main_container pa-5">

<section class="mt-5 headlights">
  <div class="spanner_box">
    <span class="text-h5 font-weight-bold pink--text mr-2">{{this.list_of_users.length }}</span><span class="text-h5 font-weight-thin">lecteurs répondent aux critères.</span>
    <v-btn outlined color="pink" class="ml-5" @click="resetSearch">Réinitialiser</v-btn>
  </div>

  <span v-if="searchObjectLecteur.card_id">Numéro de carte: {{this.searchObjectLecteur.card_id }} </span>
  <span v-if="searchObjectLecteur.lastname">Nom de famille : {{this.searchObjectLecteur.lastname }} </span>
  <span v-if="searchObjectLecteur.firstname">Prénom : {{this.searchObjectLecteur.firstname }} </span>
  <span v-if="searchObjectLecteur.email">E-mail : {{this.searchObjectLecteur.email }} </span>
  <span v-if="searchObjectLecteur.sexe">Sexualité: {{this.searchObjectLecteur.sexe }} </span>

</section>


    <v-expansion-panels dark class="mt-10" >
  <v-expansion-panel>
    <v-expansion-panel-header color="blue-grey darken-3 white--text">
      Recherche
    </v-expansion-panel-header>
    <v-expansion-panel-content>

      <div class="SearchBar">

        <section class="upperSearchBar">
          <v-text-field
            class="SearchInput"
            v-model="searchObjectLecteur.lastname"
            label="Nom de famille"
            value="Rechercher un utilistateur"
            hint="Nom de famille">
          </v-text-field>

          <v-text-field
            class="SearchInput"
            v-model="searchObjectLecteur.firstname"
            label="Prénom"
            value="Rechercher un utilistateur"
            hint="Prénom">
          </v-text-field>

          <v-text-field
            class="SearchInput"
            v-model="searchObjectLecteur.card_id"
            label="Numéro de carte"
            value="Rechercher un utilistateur"
            hint="Numéro de carte">
          </v-text-field>

          <v-text-field
            class="SearchInput"
            v-model="searchObjectLecteur.email"
            label="E-mail"
            value="Rechercher un utilistateur"
            hint="E-mail">
          </v-text-field>


          <v-text-field
            class="SearchInput"
            v-model="searchObjectLecteur.sexe"
            label="Sexualité"
            value="Rechercher un utilistateur"
            hint="Sexe">
          </v-text-field>


        </section>




      </div>


    </v-expansion-panel-content>
  </v-expansion-panel>
    </v-expansion-panels>



    <div class="action_grid">
      <Trombinoscope_card v-for="item in list_of_users" :key="item.card_id" v-bind:target_id="item.card_id" ></Trombinoscope_card>
    </div>

  </div>

</template>

<script>
  import Trombinoscope_card from '@/views/bibliothecaire/lecteurs/general/components/Trombinoscope_card.vue'
  import jagAPI from '@/api/jagAPI.js'

  export default {

    name: 'SearchLecteurs',

    components: {
      Trombinoscope_card
    },

    data() {
      return {
        // Filtres

        searchObjectLecteur:{
          card_id:'',
          firstname:'',
          lastname:'',
          birthday:'',
          sexe:'',
          email:'',
          isAdmin:'',
          orderby:'',
          col:'',
          order:'',
        },


        // Catalogue
        list_of_users:'',
      }
    },

      mounted(){
        this.searchObjectLecteur = this.$store.state.searchObjectLecteur
        this.searchObjectLecteur.isAdmin = '0'
        this.receiveTrombinoscope();
      },

      computed:{

      },

      methods:{
        async receiveTrombinoscope(){
          this.list_of_users_raw = await jagAPI.newSearchUser(this.$store.state.token, this.searchObjectLecteur);
          this.list_of_users = this.list_of_users_raw.results
        },
        async resetSearch(){
          this.searchObjectLecteur={
            card_id:'',
            firstname:'',
            lastname:'',
            birthday:'',
            sexe:'',
            email:'',
            isAdmin:'0',
            orderby:'',
            col:'',
            order:'',
          }
        },
      },

      watch:{
        searchObjectLecteur:{
          handler : async function (newsearchObjectLecteur){
            this.$store.commit('setsearchObjectLecteur', newsearchObjectLecteur)
            this.receiveTrombinoscope();
        },
        deep: true
        }
      }
    }


</script>

<style lang="css" scoped>

.headlights{
  display: flex;
  flex-direction: column;
}
.main_container{
  width:80%;
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
.SearchBar{
  /* background-color:gold; */
  display: flex;
  flex-direction: column;

  justify-content: space-between;
}

.upperSearchBar{
  display:flex;
  flex-direction: row;
  justify-content:space-between;
  flex-wrap:wrap;
}

.SearchInput{
  flex-basis:16%;
  flex-grow:0;

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


.spanner_box{
  display:flex;
  flex-direction: row;
}


</style>
