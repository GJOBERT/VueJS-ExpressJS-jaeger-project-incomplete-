<template lang="html">

  <div class="main_container">

    <v-btn
               v-scroll="onScroll"
               v-show="fab"
               fab
               dark
               fixed
               bottom
               right
               color="pink"
               @click="toTop"
             >
               <v-icon>keyboard_arrow_up</v-icon>
       </v-btn>


  <v-snackbar
  top
  v-model="deletion_snackbar_toggle"
  >
  {{ deletion_snackbar_text }}

  <template v-slot:action="{ attrs }">
    <v-btn
    color="pink"
    text
    v-bind="attrs"
    @click="deletion_snackbar_toggle = false"
    >
    Close
  </v-btn>
</template>
</v-snackbar>

<v-img class="hero_image animate__animated animate__fadeIn" lazy-src="https://media.giphy.com/media/128MHrlrHNwwU0/source.gif" alt=""></v-img>

<div class="headerblock">


  <span class="text-h2 font-weight-thin ">Mon</span><span class="text-h2 font-weight-bold animate__animated animate__fadeInUp"> catalogue   </span><span id="kanbei" class="text-subtitle-1 mt-0 mb-0 font-weight-thin">{{ this.resultats}} résultat(s)</span>








</div>

<div class="SearchBar mb-0 animate__animated animate__fadeInUp">

  <div class="StarSearchRow">
    <v-text-field
    class="SearchInput mb-0"
    outlined
    v-model="searchTermBuffer"
    hide-details
    label="Titre ou résumé"
    placeholder="Rechercher un livre"
    append-icon="search"
    @click:append="updateSearchObjectTitle"
    >
  </v-text-field>

  <v-btn @click="resetSearch" color="brown darken-4" class="ml-5 white--text pl-0"  x-large text>
    Réinitialiser
    <v-icon right dark>autorenew</v-icon>
  </v-btn>


</div>
<div class="chipbar">
  <v-chip-group
              active-class="primary--text"
              column
              dark
            >
              <v-chip
              v-if="searchObject.title"
              @click="handleChips('title')"
              close
              >
                Titre: {{this.searchObject.title}}
              </v-chip>

              <v-chip
              v-if="searchObject.category_id"
              @click="handleChips('category')"
              close
              >
                Category: {{this.nameOfCurrentCategory[0].name}}
              </v-chip>

              <v-chip
              v-if="searchObject.author"
              @click="handleChips('author')"
              close
              >
                Auteur: {{this.searchObject.author}}
              </v-chip>

              <v-chip
              v-if="searchObject.year"
              @click="handleChips('year')"
              close
              >
                Année: {{this.searchObject.year}}
              </v-chip>

              <v-chip
              v-if="searchObject.isbn"
              @click="handleChips('isbn')"
              close
              >
                ISBN: {{this.searchObject.isbn}}
              </v-chip>

              <v-chip
              v-if="searchObject.cote"
              @click="handleChips('cote')"
              close
              >
                Cote: {{this.searchObject.cote}}
              </v-chip>

              <v-chip
              v-if="searchObject.is_borrowed"
              @click="handleChips('disponibilite')"
              close
              >
                Disponibilité: {{this.disponibilite_english[this.searchObject.is_borrowed]}}
              </v-chip>


  </v-chip-group>

</div>


<v-expansion-panels class="mb-5 pa-0 animate__animated animate__fadeIn" >
  <v-expansion-panel class=" pa-0">
    <v-expansion-panel-header color="grey darken-2 white--text white" expand-icon="games">
      Recherche avancée
    </v-expansion-panel-header>
    <v-expansion-panel-content class="ma-0 pa-0 advancesearch">

      <div >

        <section class="upperSearchBar ma-0 pa-0">
          <v-text-field
          class="SearchInput2"
          color="white"
          v-model="searchObject.author"
          label="Auteur"
          hint="Nom, prénom, pseudonyme, ..."
          dark>
        </v-text-field>

        <v-text-field
        class="SearchInput2 "
        v-model="searchObject.year"
        label="Année"
        hint="Format AAAA "
        dark>
      </v-text-field>

      <v-text-field
      class="SearchInput2 "
      v-model="searchObject.isbn"
      label="ISBN"
      hint="International Standard Book Number à 13 chiffres"
      dark>
    </v-text-field>

    <v-text-field
    class="SearchInput2"
    v-model="searchObject.cote"
    label="Cote"
    value="Rechercher un utilistateur"
    hint="Figure sur la tranche du livre"
    dark>
  </v-text-field>



</section>

</div>

</v-expansion-panel-content>
</v-expansion-panel>
</v-expansion-panels>


<div class="undersearch mb-0">
  <v-select
  v-model="desired_sort_key"
  class="filter star_secondary_item"
  :items="ordres"
  label="Trier les résultats par"
  prepend-inner-icon="filter_list"
  item-text="label"
  item-value="value"

  outlined
  ></v-select>

  <v-select
  class="star_secondary_item"
  color="rgba(136, 17, 106, 0.69)"
  :items="categories"
  v-model="searchObject.category_id"
  prepend-inner-icon="category"
  item-text="name"
  item-value="id"
  label="Filtrer par catégorie"

  outlined
  ></v-select>

  <v-switch
  inset
  class="star_secondary_item switch"
  true-value="0"
  false-value="1"
  v-model="searchObject.is_borrowed"
  label="Ne montrer que livres disponibles à l'emprunt"

  >
</v-switch>

</div>







</div>


<div  class="action_grid" >

  <Component_card
  v-on:item-deleted-from-card="handleDeletion"
  v-on:snack-tweet="handleTweet"
  v-for="item in mini_list_of_books"
  :key="item.id"
  v-bind:target_id="item.id"
  >
</Component_card>

</div>

<div class="no_more_results">
<span v-if="is_finished">Tous les résultats ont été chargés.</span>
<span id="kanbei" v-if="!is_finished">Veuillez patienter, nous chargeons vos résultats.</span>
</div>


</div>

</template>

<script>
// import Component_card from '@/views/bibliothecaire/catalogue/general/components/Component_card.vue'
// import { v4 as uuidv4 } from 'uuid';
  // import _ from 'lodash';

import jagAPI from '@/api/jagAPI.js';
export default {
  name:'Catalogue_vue_ensemble',
  components:{
    Component_card: () => import('@/views/bibliothecaire/catalogue/general/components/Component_card.vue')
  },
  data(){
    return{
      // Filtres
      categories:[],
      ordres:[
        {
          label:"Date d'ajout",
          value:"id"
        },
        {
          label:"Titre",
          value:"title"
        },
        {
          label:"Année de parution",
          value:"year"
        },
        {
          label:"Auteur",
          value:"author"
        }

      ],
      desired_sort_key:'id',
      disponibilite:[
        {
          label:"Toute disponibilité",
          value:''
        },
        {
          label:"Disponible",
          value:0
        },
        {
          label:"Indisponible",
          value:1
        },
      ],
      disponibilite_english:[
        "disponible à l'emprunt",
        "toutes disponibilités"
      ],
      searchObject:{
        title:'',
        summary:'',
        author:'',
        year:'',
        isbn:'',
        cote:'',
        is_borrowed:'',
        category_id:'',
        orderby:'ORDER BY',
        col:'id',
        order:'DESC',
      },
      // Catalogue
      list_of_books:'',
      // Search
      current_search_term:'',
      // Infinite scroll by R-Slane
      mini_list_of_books:'',
      LCP : -1,
      is_started:false,
      is_finished:false,
      is_under_load : true,
      step: 4,
      initial_step:12,

      deletion_snackbar_toggle: false,
      deletion_snackbar_text: ``,
      fab: false,
      searchTermBuffer:this.$store.state.searchTermBuffer,
    }
  },
  created(){
    window.addEventListener('scroll', this.handleInfiniteScroll);
  },
  destroyed () {
    window.removeEventListener('scroll',  this.handleInfiniteScroll);
  },
  mounted(){
    // this.searchObject = this.$store.state.searchObject;
    this.retrieveBuffer();

    this.retrieveCatalogue();
    this.retrieveCategories();
    this.handleInfiniteScroll()
  },
  computed:{
    resultats(){
      return  this.list_of_books.length
    },
    nameOfCurrentCategory(){
      return this.categories.filter(category => category.id === this.searchObject.category_id)
    },
    nameOfDisponibilite(){
      if(this.searchObject.is_borrowed==="1" || this.searchObject.is_borrowed===1){
        return "En cours d'emprunt"
      }else if(this.searchObject.is_borrowed==="0" || this.searchObject.is_borrowed===0) {
        return "Disponibles à l'emprunt"
      } else{
        return "Tous"
      }
    }
  },
  methods:{

    retrieveBuffer(){
      if(this.$store.state.searchTermBuffer){
          this.searchTermBuffer = this.$store.state.searchTermBuffer;
      }else{
          this.searchTermBuffer = ''
      }

    },

    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    },

    handleTweet(message){
      this.deletion_snackbar_toggle= true
      this.deletion_snackbar_text= message
    },

    updateSearchObjectTitle(){
        this.searchObject.title= this.searchTermBuffer
        this.$store.commit('setSearchTermBuffer',this.searchTermBuffer)
    },

    handleChips(filter_name){

      switch (filter_name) {
        case 'title':
          this.searchObject.title='';
          this.searchTermBuffer='';
          this.$store.state.commit('unsetSearchTermBuffer')
          break;
        case 'author':
          this.searchObject.author='';
          break;

        case 'category':
          this.searchObject.category_id='';
          break;
        case 'year':
          this.searchObject.year='';
          break;
        case 'isbn':
          this.searchObject.isbn='';
          break;
        case 'cote':
          this.searchObject.cote='';
          break;
          case 'disponibilite':
            this.searchObject.is_borrowed='';
            break;


        default:
          console.log("Uh Oh");

      }

    },


    async handleDeletion(number){
      await jagAPI.deleteBook(this.$store.state.token, this.target_id)

      for (var i = this.mini_list_of_books.length - 1; i >= 0; i--) {
        if (this.mini_list_of_books[i].id === number) {
          this.mini_list_of_books.splice(i, 1);
        }
      }

      this.deletion_snackbar_toggle= true
      this.deletion_snackbar_text= "Ce livre a été supprimé avec succès de la base de données"

    },

    handleInfiniteScroll(){
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight *0.50) {
        if(this.is_started ===true && this.is_finished===false){
          this.getMovie_cycler();
        }
      }
    },
    async retrieveCatalogue(){
      const listFromAPI_raw = await jagAPI.newSearchBook(this.searchObject);
      // listFromAPI_raw.results.forEach( element => { element.unikey = uuidv4();});
      this.list_of_books=await listFromAPI_raw.results;
      this.is_started=true;
      this.is_finished=false;
      let borne_inferieure = this.LCP+1;
      let borne_superieure = Math.min(borne_inferieure+this.initial_step,this.list_of_books.length)
      this.mini_list_of_books = await this.list_of_books.slice(borne_inferieure, borne_superieure);
      if (this.mini_list_of_books.length === this.list_of_books.length) {
        this.is_finished=true
      }
    },
    async retrieveCategories(){
      const listFromAPI_raw = await jagAPI.getListOfCategories(this.$store.state.token);
      this.categories=listFromAPI_raw.result;
      this.categories.unshift({
        id:'',
        name:"All categories"})
      },
      async resetSearch(){
        this.$store.commit('unsetSearchObject')
        this.$store.commit('unsetSearchTermBuffer')
        this.searchTermBuffer='',
        this.searchObject={  title:'',
        summary:'',
        author:'',
        year:'',
        isbn:'',
        cote:'',
        is_borrowed:'',
        category_id:'',
        orderby:'ORDER BY',
        col:'id',
        order:'DESC',
      }
      this.desired_sort_key="id"
    },
    getMovie_cycler() {
      //Check that we have the right number of
      if(this.is_started ===true && this.is_finished===false)
      {
        if(this.list_of_books.length !== 0){
          let borne_inferieure = this.LCP+1;
          let borne_superieure = Math.min(borne_inferieure+this.step,this.list_of_books.length)
          let intron = this.list_of_books.slice(borne_inferieure, borne_superieure);
          intron.forEach(element=> {
            this.mini_list_of_books.push(element)
          })
          if (borne_superieure < this.list_of_books.length){
            this.is_finished = false;
            this.LCP = borne_superieure-1;
          }else{
            this.is_finished=true;
            this.LCP = this.list_of_books.length-1;
          }
        }
      }
    }
  },

  watch: {
    // whenever question changes, this function will run
        searchObject: {
      handler : async function (newSearchObject) {
        this.$store.commit('setSearchObject',newSearchObject)
        this.retrieveCatalogue();
        this.mini_list_of_books=''
        this.LCP=-1
        this.is_started=false
        this.is_finished=false
        this.step=4
        this.initial_step=12
      },
      deep: true
    },
    desired_sort_key: async function(){
      this.searchObject.orderby="ORDER BY"
      this.searchObject.col=this.desired_sort_key;
      this.searchObject.order="DESC";
    }
  }
}
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
.hero_image{
  height:100px;
  object-fit: cover;
}

.ubertitre{
  font-family: 'Pacifico', cursive;
  font-size:2rem;
  animation: glow 1s ease-in-out infinite alternate;
  color: black;
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
.SearchInput{
  margin-bottom:20px;

}
.filterbox{
  display:flex;
  flex-direction: row;
  column-gap: 20px;
  flex-wrap:wrap;
}

.filterbox_item{
  flex-basis:30%;
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
.bamboo{
  background-color:blue;
  margin-top:20px;
  display:grid !important;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
.upperSearchBar{
  display:flex;
  flex-direction: row;
  justify-content:space-between;
  flex-wrap:wrap;
}
.advancesearch{
  background-color: rgb(31, 30, 29);
  display:flex;
  flex-direction: row;
  flex-wrap:wrap;
  column-gap:5px;
  align-items:baseline;
}

.attempt{
  background-color: transparent;
}

.StarSearchRow{
  display:flex;
  flex-direction: row;
  column-gap:5px;

}
.undersearch{
  flex-grow:0;
  column-gap:10px;
  display:flex;
  flex-direction:row;
  align-items:baseline;

}

#kanbei::before{
  content: '';
  height: 12px;
  width: 12px;
  background-color: #fa3a3a;
  border-radius: 50%;
  display: inline-block;
  animation: blink 1.5s ease-in-out infinite;
  margin-right: 4px;
  margin-bottom: -1px;
}

.no_more_results{
  width:80%;

  margin:auto;
  background-color:rgb(35, 35, 36);
  border-radius:40px;
  margin-top:20px;
  text-align:center;
  font-family: 'Roboto Thin', sans-serif;
  font-weight:bold;
  color:white;


}

.chipbar{
  display:flex;
  flex-direction: row;
  width:100%;
  margin:0;
  padding:0;
}

@keyframes blink {

  0%,
  100% {
    opacity:0
  }
  40%,
  70% {
    opacity:1
  }
}


@keyframes glow {
  from {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;
  }
  to {
    text-shadow: 0 0 10px rgb(221, 53, 107), 0 0 20px rgb(221, 53, 107), 0 0 30px rgb(221, 53, 107), 0 0 40px rgb(221, 53, 107), 0 0 50px rgb(221, 53, 107), 0 0 100px rgb(221, 53, 107), 0 0 70px #0073e6;
  }
}
</style>
