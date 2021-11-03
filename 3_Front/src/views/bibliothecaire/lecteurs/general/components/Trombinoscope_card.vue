<template lang="html">

    <v-card class="mx-auto animate__animated animate__fadeIn cardz">
      <router-link :to="{ name: 'Page_lecteur', params: {id:target_id} }">
      <img
      v-bind:src="current_image_src"
      class="card_photo"
      >

      <v-card-title class="subtitle-1">
        {{target_user.lastname }},{{target_user.firstname}}
      </v-card-title>

      <v-card-subtitle class="display-0">
        {{target_user.card_id }}
      </v-card-subtitle>

      <v-card-actions>





    </v-card-actions>

</router-link>
  </v-card>


</template>

<script>
import jagAPI from '@/api/jagAPI.js'
export default {
  name:'Trombinoscope_card',
  props:['target_id'],

  data(){
    return{
      target_user:{},
      current_image_src:'',
      is_ready:false,
    }
  },


  mounted(){
    this.getUserInfo(this.target_id);
  },

  methods:{
    async getUserInfo(id){
      const user_details_raw =   await jagAPI.getUserDetails(id, this.$store.state.token,);
      this.target_user = user_details_raw.user;

      this.birthday_modified=this.target_user.birthday.substring(0,10)
      var base64data = Buffer.from(this.target_user.avatar);
      this.current_image_src = base64data
      this.current_image_base64 = base64data;
      this.is_ready=true

    }
  }


}
</script>

<style lang="css" scoped>
.cardz{
  width:100%;


}

.card_photo{
  width:100%;
  height:150px;
  flex-basis:30%;
  max-height:100%;
  object-fit:contain;
  padding:5%;
  background-color:black;
}
</style>
