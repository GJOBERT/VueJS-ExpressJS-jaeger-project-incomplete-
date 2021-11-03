<template lang="html">
  <div class="main_container">
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

    <p class="display-3 font-weight-thin">Ajouter un livre</p>
    <p class="display-1 font-weight-thin">Page d'ajout d'un livre</p>

    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
>
    <div class="info_block">
      <div class="left_side">
        <img  v-if="image_preview_url" :src="image_preview_url" class="Book_illustration">
        <img  v-if="!image_preview_url" class="Book_illustration_placeholder" src="@/assets/placeholder/imageplaceholder.jpg">
        <v-file-input
           @change="onFileChange"
           placeholder="Ajoutez une illustration..."
           filled
           prepend-icon="mdi-camera"
           accept="image/png, image/jpeg, image/bmp"
           :rules="imageRules"
           required
        ></v-file-input>
      </div>

      <div class="right_side">
        <v-text-field
        v-model="new_book.title"
        label="Titre du livre"
        prepend-inner-icon="assignment"
        :rules="titleRules"
        required

        >``</v-text-field>

        <v-text-field
        v-model="new_book.author"
        label="Auteur"
        prepend-inner-icon="border_color"
        :rules="authorRules"
        required

        >``</v-text-field>



        <v-select
        class=""
        :items="categories"
        v-model="new_book.category_id"
        item-text="name"
        item-value="id"
        label="Catégorie"
        hint="Sélectionner une catégorie"
          prepend-inner-icon="category"
          :rules="categoryRules"
        persistent-hint
        required
        ></v-select>


        <v-text-field
        v-model="new_category"
        label="Créez une nouvelle catégorie"
        append-icon="send"
        @click:append="createCategory"
        required

        >``</v-text-field>




        <v-text-field
        v-model="new_book.year"
        label="Année de parution"
        prepend-inner-icon="schedule"
        :rules="yearRules"
        required

        >``</v-text-field>

        <v-text-field
        v-model="new_book.isbn"
        label="ISBN"
        prepend-inner-icon="qr_code_2"
        :rules="isbnRules"
        required

        >``</v-text-field>

        <v-text-field
        v-model="new_book.cote"
        label="Cote"
        prepend-inner-icon="local_offer"
        :rules="coteRules"
        required

        >``</v-text-field>

<div class="summary_slot">
  <v-textarea
  outline
  name="input-7-4"
  label="Résumé"
  v-model="new_book.summary"
  prepend-inner-icon="assignment"
  no-resize
  rows="3"
  auto-grow
    :rules="summaryRules"
  required
  ></v-textarea>
</div>



        <div class="mini_rack">
          <v-btn @click="submit">Créer ce livre</v-btn>
          <v-btn @click="reset">Recommencer</v-btn>

        </div>

      </div>

    </div>
</v-form>
  </div>

</template>

<script>

import jagAPI from '@/api/jagAPI.js'
export default {
  name:'Add_livre',
  data(){
    return{
      snackbar_toggle:false,
      snackbar_text:'',

      new_book:{
        title:'',
        summary:'',
        year:'',
        isbn:'',
        author:'',
        cote:'',
        category_id:'',
        date_begin:'1000-01-01',
        date_end:'1000-01-01',
        image:{},
        borrowed_by:'',
        is_borrowed:'0',
      },

      image_preview_url:'',
      image_preview_file:'',
      current_star_blob:'',

      categories:[],

      valid: true,
      titleRules:[
        v => !!v || 'Title is required',
        v => (v && v.length <= 20) || 'Title must be less than 20 charac',
     ],

     authorRules:[
       v => !!v || 'Author is required',
       v => (v && v.length <= 20) || 'Author must be less than 20 charac',
     ],

     categoryRules:[
       v => !!v || 'Category is required',

     ],

     yearRules:[
       v => !!v || 'Year is required',
       v=> (!isNaN(parseFloat(v)) && v >= -5000 && v <= 2020) || 'Year has to be between 5000 BCE and 2020 CE',
     ],

     isbnRules:[
       v => !!v || 'ISBN is required',
       v=> (!isNaN(parseFloat(v)) && v.length === 13) || 'ISBN must be a 13 characters string',
     ],
     coteRules:[
       v => !!v || 'Cote is required',
      v=> (v.length >= 5 && v.length <=9) || 'Cote length must be between 5 and 9',
    ],
     imageRules:[
        v => !!v || 'Image is required',
        value => !value || value.size < 2000000 || 'Illustration size should be less than 2 MB!',
      ],
      summaryRules:[
        v => !!v || 'Summary is required',
        v=> (v.length >= 150 && v.length <=5000) || 'Summary length must be between 150 and 5000 characters',
      ],

      new_category:'',




    }
  },
  mounted(){
    this.retrieveCategories();
  },

  methods:{
    validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
        this.image_preview_url=null
      },
      resetValidation () {
        this.$refs.form.resetValidation()

      },

    async createCategory(){
      if (this.new_category !== '') {
        if (this.categories.filter(e => e.name === this.new_category).length > 0) {
          this.snackbar_toggle=true;
          this.snackbar_text="La catégorie" + this.new_category.toUpperCase()+ " existe déjà, tentez-en une autre";
        }else{

          let data={
            name:''
          }
          data.name = this.new_category;
          await jagAPI.createCategory(this.$store.state.token, data)

          this.snackbar_toggle=true;
          this.snackbar_text="Vous avez crée la catégorie "+ this.new_category.toUpperCase() + " avec succès!";
          this.retrieveCategories();
          this.new_category='';
          }
      }else{
        this.snackbar_toggle=true;
        this.snackbar_text="Vous n'avez saisi aucune catégorie...";
      }

    },

    async retrieveCategories(){
      const listFromAPI_raw = await jagAPI.getListOfCategories(this.$store.state.token);
      this.categories=listFromAPI_raw.result;
    },

    onFileChange(e) {

      const file = e;

      //Décoder l'image uploadée
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => this.new_book.image = reader.result;

      //La transformer en URL pour l'affichage
      this.image_preview_url = URL.createObjectURL(file);

      fetch(this.image_preview_url)
      .then(res => res.blob()) // Gets the response and returns it as a blob
      .then(blob => {
        this.current_star_blob=blob;

      });



    },

    async submit(){
       if(this.$refs.form.validate()){
         console.log("Final blobby before save");

         console.log("State of the object sent to API");
         console.log(JSON.stringify(this.new_book));

         let response = await jagAPI.createBook(this.$store.state.token, this.new_book)
         console.log("Server response:");
         console.log("Reponse:");
         console.log(response);
         this.$store.commit('unsetSearchObject')
         this.$router.push({name:'Catalogue_overview'});
       }


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
  flex-wrap:wrap;
}

.info_block{
  /* background-color: gold; */
  margin-top:20px;
  display:flex;
  flex-wrap:wrap;
  flex-direction: row;
  justify-content: space-evenly;
  column-gap:30px;
}

.left_side{
  /* background-color: rebeccapurple; */
  flex-basis:30%;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
}

.right_side{
  /* background-color: azure; */

  display:grid;

  grid-template-columns: 1fr 1fr;
  column-gap: 20px;


   flex-basis:60%
  /* height:60%;
  flex-direction: column;
  justify-content: space-between; */

}

.Book_illustration{
  width:100%;
  height:350px;
  min-width:320px;
  object-fit:contain;
  background-color: black;
}

.Book_illustration_placeholder{
  width:100%;
  height:350px;
  min-width:320px;
  object-fit:cover;
  background-color: black;
}

.mini_rack{
  display:flex;
  flex-direction:row;
  justify-content: flex-end;
  column-gap: 20px;
}

.summary_slot{
  grid-column-start:1;
  grid-column-end:3;
}

</style>
