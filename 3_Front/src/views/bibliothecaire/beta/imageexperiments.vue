<template lang="html">
<img v-bind:src="image_preview_url" alt="">
</template>

<script>
import jagAPI from '@/api/jagAPI.js'
export default {
  name:"Image_experiments",

  data(){
    return{
      target_book:'',
      image_preview_url:'',
    }
  },

  mounted(){
    this.fetchCurrentBook(34);

  },


  methods:{
    async fetchCurrentBook(id){
      //Récupérer l'objet Book de l'API, le déballer de son wrapper
      const book_details_raw =  await jagAPI.getSingleBookDetails(id);
      this.target_book = book_details_raw.result[0];

      //Annoncer le type natif retourné par l'api après jsonification
      console.log("Image received !");
      console.log(this.target_book.image);

      //OK donc insuffisant pour afficher l'image en soi. Petite conversion nécessaire...
      this.image_preview_url = Buffer.from(this.target_book.image);


    },

  }



}
</script>

<style lang="css" scoped>
</style>
