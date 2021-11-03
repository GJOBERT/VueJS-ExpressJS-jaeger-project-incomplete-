<template lang="html">
  <div class="main_container mt-10">

    <p class="display-4 font-weight-thin">Ajouter un utilisateur</p>

    <v-form
    ref="form"
    v-model="valid"
    lazy-validation>

    <div class="info_block mt-10">
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
        required
        ></v-file-input>

      </div>

      <div class="right_side">

        <section>
                    <span class="display-1 font-weight-thin mb-5">Identifiants</span><br>


                    <span v-if="email_already_exists" class="red--text text-caption">Email already exists, pick another one</span>
                    <v-text-field
                    v-model="email_candidate"
                    label="Email"
                    required
                    prepend-inner-icon="email"
                    :rules="emailRules"
                    class="mb-5"

                    >``</v-text-field>

                    <v-expansion-panels dark class="mb-10 blue">
                <v-expansion-panel  v-model="openedPanel" >
                  <v-expansion-panel-header color="blue-grey darken-3 white--text">
                    Créer un mot de passe
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="mt-5">
                    <v-text-field
                    required
                    prepend-inner-icon="vpn_key"
                    v-model="new_user.password"
                       :type="'password'"
                      hint="At least 8 characters"
                      label="Nouveau mot de passe"
                      value=''
                    >``</v-text-field>

                    <v-text-field
                      required
                       :rules="pwdConfirm"
                       prepend-inner-icon="vpn_key"
                       :type="'password'"
                      hint="At least 8 characters"
                    label="Confirm password"
                    >``</v-text-field>

                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>

        </section>


        <span class="display-1 font-weight-thin">Privilèges</span><br>
        <v-radio-group v-model="new_user.isAdmin"
        :rules="isadminRules"
        required
         row>
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
        <v-radio-group v-model="new_user.sexe"
        :rules="sexRules"
        required
         row>
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
        required
        v-model="new_user.firstname"
        :rules="nameRules"
        label="Prénom"

        >``</v-text-field>

        <v-text-field
        v-model="new_user.lastname"
        :rules="nameRules"
        label="Nom de famille"

        >``</v-text-field>

        <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="new_user.birthday"
            label="Date de naissance"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            required
            :rules="dateRules"
          ></v-text-field>
        </template>
        <v-date-picker
          required
          v-model="new_user.birthday"
          no-title
          scrollable
          :rules="dateRules"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>



        <div class="mini_rack">
          <v-btn @click="submit"  :disabled="!valid" >Enregistrer</v-btn>



        </div>


      </div>

    </div>



    </v-form>


  </div>


</template>

<script>

import jagAPI from '@/api/jagAPI.js'
import { v4 as uuidv4 } from 'uuid';


export default {
  name:'Add_lecteur',
  data(){
    return{
      date: '',
      menu: false,
      modal: false,
      menu2: false,
      email_candidate:'',

      email_already_exists:false,

      new_user:{
        firstname:'',
        lastname:'',
        birthday:'',
        sexe:'',
        email:'',
        password:'',
        avatar:'',
        card_id:'',
      },
      pwdRules: [v => !!v || "Password required"],

      pwdConfirm: [
      v => !!v || "Confirm password",
      v => v === this.new_user.password || "Passwords do not match"
      ],
      imageRules:[
         v => !!v || 'Image is required',
         value => !value || value.size < 2000000 || 'Illustration size should be less than 2 MB!',
       ],
       emailRules:[
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
       ],
       passwordRules:[
         v => !!v || 'Password is required',
         value => value.length > 8 || 'Password should be at least 8 characters long',
       ],
       isadminRules:[
         v => v===0 || v===1 || 'Role is required',
       ],
       sexRules:[
         v => !!v || 'Gender is required',
       ],
       nameRules:[
         v => !!v || 'Name is required',
         v => v.length <=20 || 'Name must be less than 20 characters long',
       ],
       dateRules:[
         v => !!v || 'Birthday is required',
       ],


      valid: false,
      openedPanel:null,
      password_confirmation:'',

      birthday_raw:'',
      image_preview_url:'',
      image_preview_file:'',
    }
  },
  mounted(){

  },

  methods:{
    validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset();
        this.image_preview_url=null;
        this.new_user={}
      },
      resetValidation () {
        this.$refs.form.resetValidation()

      },

    onFileChange(e) {
      console.log("change captured:");
      console.log(e);
      const file = e;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
      this.new_user.avatar = reader.result;

      console.log("New user state before upload: ");
      console.log(this.new_user);
      this.image_preview_url = URL.createObjectURL(file);


    },

    async submit(){
         if(this.$refs.form.validate() && this.email_already_exists===false){
           this.new_user.card_id = uuidv4().replace(/\D/g,'').substring(0,6);
           this.new_user.email=this.email_candidate;

           //Date operations
           //1: Convert everything to JS date objects
           let birthday_live_a = new Date(this.new_user.birthday)
           birthday_live_a.setDate(birthday_live_a.getDate() + 1)
           let birthday_string = birthday_live_a.toISOString().split('T')[0];
           this.new_user.birthday = birthday_string

           const create_request = await jagAPI.createUser(this.$store.state.token, this.new_user)
           console.log(create_request);
           this.$router.push({name:'Trombinoscope'});
         }

    },
  },

  watch:{
    email_candidate : async function(newEmail){
      let response = await jagAPI.checkMail(this.$store.state.token, newEmail);
      console.log("Email checker has been called");
      console.log("This is the response ");
      console.log(response.results);
      if(response.results.length > 0){
          this.email_already_exists=true;
          console.log("Email checker conclusion : email is fucked up");

      }else{
          this.email_already_exists=false;
        console.log("Email checker conclusion : email is okay");

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
  justify-content: space-between;
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
  flex-basis:60%;
  height:60%;
  flex-direction: column;
  justify-content: space-between;

}

.Book_illustration{
  width:100%;
  height:450px;
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

</style>
