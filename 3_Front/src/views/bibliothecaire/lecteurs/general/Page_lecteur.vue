<template lang="html">
  <div class="main_container">

    <v-btn @click="goback" icon><v-icon>keyboard_backspace</v-icon></v-btn>
    <span v-if="target_user.card_id === this.$store.state.user.card_id" class="display-1 font-weight-thin">Mon profil</span><br>
    <span v-if="target_user.card_id !== this.$store.state.user.card_id" class="display-1 font-weight-thin">Profil utilisateur</span><br>

    <span class="display-3">{{this.target_user.lastname}}, {{this.target_user.firstname}}</span>
    <span v-if="target_user.isAdmin === 1" class="display-1 font-weight-thin"><v-icon class="mr-5" large>school</v-icon>Bibliothécaire</span><br>
    <span v-if="target_user.isAdmin === 0" class="display-1 font-weight-thin"><v-icon class="mr-5" large>face</v-icon>Lecteur</span><br>

      <v-tabs

      class="mt-5"
      center-active

      background-color="blue-darken-3 accent-4"
     fixed-tabs>
     <v-tab @click="reload" eager>
       Profile
     </v-tab >
     <v-tab-item >
         <div class="info_block mt-10">
             <div class="left_side">
               <img  v-if="image_preview_url" :src="image_preview_url" class="Book_illustration">
               <img  v-if="!image_preview_url" class="Book_illustration" v-bind:src="current_image_src">
             </div>


             <div class="right_side">
               <v-form
               ref="form"
               v-model="valid"
               lazy-validation

               >
               <section>
                           <span class="display-1 font-weight-thin ">Identifiants</span><br>
                           <v-text-field
                           v-model="target_user.card_id"

                           label="Numéro de carte"
                           disabled
                           >``</v-text-field>

                           <v-text-field
                           v-model="target_user.email"
                           label="Email"
                           disabled
                           >``</v-text-field>

               </section>


                 <span class="display-1 font-weight-thin">Privilèges</span><br>
                 <v-radio-group v-model="target_user.isAdmin" row disabled>
                 <v-radio
                   :key="'bibliothecaire'"
                   :label="'Bibliothecaire'"
                   :value="1"
                 ></v-radio>
                 <v-radio
                   :key="'lecteur'"
                   :label="'Lecteur'"
                   :value="0"
                 ></v-radio>
               </v-radio-group>


             <span class="display-1 font-weight-thin">Infos</span><br>
               <v-radio-group v-model="target_user.sexe" row disabled>
             <v-radio
               :key="'m'"
               :label="'Homme'"
               :value="'h'"
             ></v-radio>
             <v-radio
               :key="'f'"
               :label="'Femme'"
               :value="'f'"
             ></v-radio>
             </v-radio-group>

                 <v-text-field
                 v-model="target_user.firstname"

                 label="Prénom"
                 disabled

                 >``</v-text-field>

                 <v-text-field
                 v-model="target_user.lastname"

                 label="Nom de famille"
                 disabled

                 >``</v-text-field>

                 <v-text-field
                 v-model="birthday_modified"
                 label="Date de naissance"
                 disabled

                 >``</v-text-field>



               </v-form>

               </div>
               </div>
     </v-tab-item >
     <v-tab eager>
       Modifier le profile
     </v-tab>
     <v-tab-item >
       <Modify_lecteur @please-refresh="getUserInfo" :id="target_id"/>
     </v-tab-item>
     <v-tab eager>
       Emprunts en cours
     </v-tab>
     <v-tab-item >
         <CartView :target_id="this.target_id" @please-refresh="getUserInfo" :id="target_id"/>
     </v-tab-item>
   </v-tabs>


  </div>

</template>

<script>
import jagAPI from '@/api/jagAPI.js'
import Modify_lecteur from '@/views/bibliothecaire/lecteurs/editor/Modify_lecteur.vue'
import CartView from '@/views/bibliothecaire/lecteurs/general/components/CartView.vue'
export default {
  name: 'Page_lecteur',
  components:{
    Modify_lecteur,
    CartView,
  },

  data() {
    return {
      target_id: '',
      target_user:'',
      current_image_src:'',
      current_image_base64:'',
      birthday_modified:'',
      image_preview_url:'',
      new_password:'',
      pwdRules: [v => !!v || "Password required"],
      pwdConfirm: [
      v => !!v || "Confirm password",
      v => v === this.new_password || "Passwords do not match"
    ],
    valid:false,
    openedPanel:null,


    }
  },

  mounted() {
    this.target_id = this.$route.params.id;

    this.getUserInfo(this.target_id);
    console.log("Initializing view with user card_id : #"+this.target_id);
  },

  computed:{
  },

  methods:{

    reload(){
      this.getUserInfo(this.target_id)
    },

    goback(){
      this.$router.go(-1)
    },


    async getUserInfo(id){
      const user_details_raw =  await jagAPI.getUserDetailsSpecial(id, this.$store.state.token,);
      const user_details = user_details_raw.result[0];
      this.target_user = user_details;


      this.birthday_modified=this.target_user.birthday.substring(0,10)


      this.image_preview_url = Buffer.from(this.target_user.avatar);

      // fetch(this.image_preview_url)
      // .then(res => res.blob()) // Gets the response and returns it as a blob
      // .then(blob => {
      //    this.target_book.image = blob;
      //    }
      // );

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

   },

    async handlePasswordChange(){
      this.target_user.password = this.new_password

    },

    async submit(){

      delete this.target_user["id"];
      this.target_user.birthday = this.target_user.birthday.substring(0,10)
      this.target_user.avatar = await this.image_replacer();
      await jagAPI.modifyUser(this.$store.state.token, this.target_id, this.target_user)
      this.$router.go(-1)

    },

    async onFileChange(e) {
      const file = e;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>

      this.target_user.avatar = reader.result;
      this.image_preview_url = URL.createObjectURL(file);
      this.target_user.avatar = await this.image_replacer();
    },

    validate () {
  this.$refs.form.validate()
},
reset () {
  this.$refs.form.reset();
  this.getUserInfo(this.target_id);
  this.openedPanel=null
},
resetValidation () {
  this.$refs.form.resetValidation()
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
}

.info_block{
  /* background-color: gold; */
  margin-top: 20px;

  display:flex;
  flex-direction: row;
  justify-content: space-between;
}

.left_side{
  /* background-color: rebeccapurple; */
  flex-basis:30%;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.right_side{
  /* background-color: azure; */
  flex-basis:60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height:60%;
}

.Book_illustration{
  width:100%;
  height:450px;
  background-color: black;
  object-fit:cover;
}

.loan_status{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  column-gap: 20px;
}

.mini_rack{
  display:flex;
  flex-direction:row;
  justify-content: flex-end;
  column-gap: 20px;

}

</style>
