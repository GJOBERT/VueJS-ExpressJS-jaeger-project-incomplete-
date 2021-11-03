<template lang="html">
  <div class="main_container">
    <div class="headerblock mt-5">
      <span class="text-h2 font-weight-thin animate__animated animate__fadeIn">Bonjour</span><span class="text-h2 blue--text text--darken-3 font-weight-bold "> {{this.$store.state.user.firstname}} ! </span>
      <div class="spanbox mt-0">
        <span class="text-h6 font-weight-thin">Nous sommes le  </span>
        <span class="text-h6 font-weight-bold blue--text text--darken-3">{{this.today}}</span>
      </div>

    </div>
  <v-img lazy-src="https://media.giphy.com/media/XHdrXvgdvyQjtRBwyA/source.gif" class="hero_image mt-5" alt=""></v-img>
  <div class="spanbox mt-0">
    <span class="text-h6 font-weight-thin">{{this.nombre_total_de_lecteurs}}</span>
    <router-link :to="{ name: 'Trombinoscope', params: {} }">  <span class="text-h6 font-weight-bold blue--text text--darken-3"> utilisateurs </span></router-link>

    <span class="text-h6 font-weight-thin">vous attendent</span>
  </div>
  <div class="spanbox mt-0">
    <span class="text-h6 font-weight-thin">...et</span>
    <span class="text-h6 font-weight-thin "> {{this.nombre_de_livres}} </span>
    <router-link :to="{ name: 'Catalogue_overview', params: {} }"><span class="text-h6 font-weight-bold blue--text text--darken-3"> livres </span></router-link>

    <span class="text-h6 font-weight-thin"> livres ont élu domicile dans votre bibliothèque</span>
  </div>


  </div>



</template>

<script>
import jagAPI from "@/api/jagAPI.js"

export default {
  name:'Portail_bibliothecaire',
  data(){
    return{
      nombre_total_de_lecteurs:'',
      nombre_de_livres:','
    }
  },
  mounted(){
    this.get_totals();
  },

  computed:{
    today(){
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let output = new Date().toLocaleDateString("fr-FR", options)

      return output;
    },
  },
    methods:{
      async get_totals(){
        let library_count_raw = await jagAPI. getLecteurSimpleCount(this.$store.state.token)
        this.nombre_total_de_lecteurs = library_count_raw.results[0].nombre;

        let library_counts_raw = await jagAPI.getCountAllBooks(this.$store.state.token)
        this.nombre_de_livres = library_counts_raw.results[0].nombre;
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

.hero_image{
  width:100%;
  height:300px;
  object-fit: cover;
}
.action_grid{
  display:grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  column-gap:20px;
  row-gap:20px;

}

.stat_square{
  display:flex;  flex-direction: column;

}


</style>
