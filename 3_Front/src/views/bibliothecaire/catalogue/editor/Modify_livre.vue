<template lang="html">
  <div class="main_container">


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

        <v-btn @click="goback" icon xx-large><v-icon>keyboard_backspace</v-icon></v-btn>
    <p class="display-3 font-weight-thin">Modifier un livre</p>
    <p class="display-1 font-weight-thin">Page de modification d'un livre</p>

    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
>
    <div class="info_block">
      <div class="left_side">
        <img  v-if="image_preview_url" :src="image_preview_url" class="Book_illustration">
        <img  v-if="!image_preview_url" class="Book_illustration" src="@/assets/placeholder/imageplaceholder.jpg">
        <v-file-input
           @change="onFileChange"
           placeholder="Ajoutez une illustration..."
           filled
           prepend-icon="mdi-camera"
           accept="image/png, image/jpeg, image/bmp"
           :rules="imageRules"

        ></v-file-input>
      </div>

      <div class="right_side">
        <v-text-field
        v-model="target_book.title"
        label="Titre du livre"
        prepend-inner-icon="assignment"
        :rules="titleRules"
        required

        >``</v-text-field>

        <v-text-field
        v-model="target_book.author"
        label="Auteur"
        prepend-inner-icon="border_color"
        :rules="authorRules"
        required

        >``</v-text-field>



        <v-select
        class=""
        :items="categories"
        v-model="target_book.category_id"
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
        v-model="target_book.year"
        label="Année de parution"
        prepend-inner-icon="schedule"
        :rules="yearRules"
        required

        >``</v-text-field>

        <v-text-field
        v-model="target_book.isbn"
        label="ISBN"
        prepend-inner-icon="qr_code_2"
        :rules="isbnRules"
        required

        >``</v-text-field>

        <v-text-field
        v-model="target_book.cote"
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
  v-model="target_book.summary"
  prepend-inner-icon="assignment"
  no-resize
  rows="3"

    :rules="summaryRules"
  required
  ></v-textarea>
</div>

        <div class="mini_rack">
          <v-btn color="success" @click="submit" small> <v-icon class="mr-3">save</v-icon> Enregistrer les modifications </v-btn>
          <v-btn color="orange" @click="annuler" small> <v-icon class="mr-3">history</v-icon>Recommencer</v-btn>
          <v-btn color="error" @click="remove" small> <v-icon class="mr-3">delete_forever</v-icon>Supprimer ce livre</v-btn>

        </div>

      </div>

    </div>
</v-form>
  </div>


</template>

<script>
import jagAPI from '@/api/jagAPI.js'

export default {
  name:'Modify_livre',
  data(){
    return{
      new_category:'',
      target_id: '',
      target_book:'',
      image_preview_url:'',
      current_star_blob:'',
      carrier_file:'',

        categories:[],
        deletion_snackbar_toggle: false,
    deletion_snackbar_text: `Livre modifié avec succès`,


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

        value => !value || value.size < 2000000 || 'Illustration size should be less than 2 MB!',
      ],
      summaryRules:[
        v => !!v || 'Summary is required',
        v=> (v.length >= 150 && v.length <=5000) || 'Summary length must be between 150 and 5000 characters',
      ],

    }


  },
  async mounted(){
    this.target_id = this.$route.params.id;
    this.fetchCurrentBook(this.target_id);
    this.retrieveCategories();


    console.log("Initial loading complete ! ");
    console.log(this.target_book.image);


  },

  computed:{
    disponibilite(){
      if(this.target_book.borrowed_by === "0"){
        return "Disponible"
      }else{
        return "Indisponible"
      }
    }
  },

  methods:{
    async createCategory(){
      //Check it doesn't already exist
      if (this.categories.filter(e => e.name === this.new_password).length > 0) {
        this.deletion_snackbar_toggle=true;
        this.deletion_snackbar_text="La catégorie" + this.new_category.toUpperCase()+ " existe déjà, tentez-en une autre";
      }else{
      //Function to call
        let data={
          name:''
        }
        data.name = this.new_category;
        await jagAPI.createCategory(this.$store.state.token, data)

        this.deletion_snackbar_toggle=true;
        this.deletion_snackbar_text="Vous avez crée la catégorie "+ this.new_category.toUpperCase() + " avec succès!";
        this.retrieveCategories();
        this.new_category='';

        }

    },

    async retrieveCategories(){
      const listFromAPI_raw = await jagAPI.getListOfCategories(this.$store.state.token);
      this.categories=listFromAPI_raw.result;
    },

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

    annuler(){

      this.fetchCurrentBook(this.target_id)
    },

    goback(){
      this.$router.go(-1)
    },

      async fetchCurrentBook(id){
        //Récupérer l'objet Book de l'API, le déballer de son wrapper
        const book_details_raw =  await jagAPI.getSingleBookDetails(id);
        this.target_book = book_details_raw.result[0];

        //Retraiter le blob image afin qu'il soit displayable
        this.image_preview_url = Buffer.from(this.target_book.image);

        //Retraiter immédiatement l'image


        fetch(this.image_preview_url)
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
           this.target_book.image = blob;
           }
        );


      },

      async image_replacer(){
        const response = await fetch(this.image_preview_url);
       const blob = await response.blob();
       const reader = new FileReader();
       await new Promise((resolve, reject) => {
         reader.onload = resolve;
         reader.onerror = reject;
         reader.readAsDataURL(blob);
       });
       return reader.result.toString();

          }


        ,




      async submit(){
        if(this.$refs.form.validate()){

        delete this.target_book["id"];


        this.target_book.date_begin = this.target_book.date_begin.substring(0,10)
        this.target_book.date_end = this.target_book.date_end.substring(0,10)


        this.target_book.image = await this.image_replacer(this.target_book.image);

        let response = await jagAPI.modifyBook(this.$store.state.token, this.target_id, this.target_book)
        console.log("Request sent - response : ");
            this.deletion_snackbar_toggle_message= "Livre modifié avec succès";
             this.deletion_snackbar_toggle= true;
        console.log(response);

        //Si tout va bien, snackbar succès
        this.deletion_snackbar_toggle= true;
                this.deletion_snackbar_text= "Ce livre a été modifié avec succès";
      }else{
        console.log("Fuck you");
      }
        // this.$router.go(-1)

      },

       async wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
        }
      },

      async remove(){
        const delete_request = await jagAPI.deleteBook(this.$store.state.token, this.target_id)
        console.log("Deletee Request sent !")
        console.log("Response:");
        console.log(delete_request);

        this.deletion_snackbar_toggle= true;
        this.deletion_snackbar_toggle_text= "Livre supprimé avec succès";
        this.$router.push({name:'Catalogue_overview'});


      },

      async rendre(){
        await jagAPI.rendreBook(this.$store.state.token, this.target_id)
        this.$router.go()
      },

      async onFileChange(e) {
        const file = e;

        //Décoder l'image uploadée
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => this.target_book.image = reader.result;

        //La transformer en URL pour l'affichage
        this.image_preview_url = URL.createObjectURL(file);

        this.target_book.image = await this.image_replacer();
        console.log("New image uploaded successfully");
        console.log("This target book image after upload & await replace:");
        console.log(this.target_book.image);



      },
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
    grid-template-columns: 50% 50%;
    column-gap: 20px;


     flex-basis:60%
    /* height:60%;
    flex-direction: column;
    justify-content: space-between; */

  }

  .Book_illustration{
    width:100%;
    height:60%;
    min-width:320px;
    object-fit:contain;
    background-color: black;
  }

  .mini_rack{
    display:flex;
    grid-column-start:1;
    grid-column-end:3;

    flex-direction:row;
    justify-content: flex-end;
    column-gap: 20px;
  }

  .summary_slot{
    grid-column-start:1;
    grid-column-end:3;
  }

  </style>
