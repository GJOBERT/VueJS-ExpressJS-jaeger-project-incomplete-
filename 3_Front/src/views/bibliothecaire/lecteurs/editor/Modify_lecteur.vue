<template lang="html">

    <div class="info_block mt-10">

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

      <div class="left_side">
        <img  v-if="image_preview_url" :src="image_preview_url" class="Book_illustration">
        <img  v-if="!image_preview_url" class="Book_illustration" v-bind:src="current_image_src">
        <v-file-input
        @change="onFileChange"

        accept="image/png, image/jpeg, image/bmp"
        placeholder="Choisissez un fichier"
        prepend-icon="mdi-camera"
        label="Illustration"
        ></v-file-input>

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

                    >``</v-text-field>

                    <v-expansion-panels class="mb-10 blue">
                <v-expansion-panel  v-model="openedPanel" >
                  <v-expansion-panel-header color="blue-grey darken-3 white--text">
                    Modification du mot de passe
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="mt-5">
                    <v-text-field
                    v-model="new_password"
                       :type="'password'"
                      hint="At least 8 characters"
                      label="Nouveau mot de passe"
                      value=''
                      :rules="passwordRules"
                    >``</v-text-field>

                    <v-text-field

                       :rules="pwdConfirm"
                       :type="'password'"
                      hint="At least 8 characters"
                    label="Confirm password"
                    >``</v-text-field>

                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>

        </section>


        <span class="display-1 font-weight-thin">Privilèges</span><br>
        <v-radio-group v-model="target_user.isAdmin" row>
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
        <v-radio-group v-model="target_user.sexe" row>
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

        >``</v-text-field>

        <v-text-field
        v-model="target_user.lastname"

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
            v-model="birthday_modified"
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
          v-model="birthday_modified"
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
          <v-btn @click="reset">Annuler</v-btn>
          <v-btn  color="red" @click="deleteUser" class="white--text">Supprimer l'utilisateur <v-icon right dark>delete</v-icon></v-btn>

        </div>
      </v-form>

      </div>

    </div>



</template>

<script>
import jagAPI from '@/api/jagAPI.js'
export default {
  name: 'Modify_lecteur',

  data() {
    return {
      date: '',
      menu: false,
      modal: false,
      menu2: false,

      snackbar_toggle:false,
      snackbar_text:'',

      target_id: '',
      target_user:'',
      current_image_src:'',
      current_image_base64:'',
      birthday_modified:'',
      image_preview_url:'',
      new_password:'',
      passwordRules:[
        v => !!v || 'Password is required',
        value => value.length > 8 || 'Password should be at least 8 characters long',
      ],
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

    goback(){
      console.log("Fuck you");
    },

    async getUserInfo(id){
      const user_details_raw =  await jagAPI.getUserDetailsSpecial(id, this.$store.state.token,);
      const user_details = user_details_raw.result[0];
      this.target_user = user_details;
      this.birthday_modified=this.target_user.birthday.substring(0,10)
      this.image_preview_url = Buffer.from(this.target_user.avatar);
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

    async submit(){
   if(this.$refs.form.validate()){
     delete this.target_user["id"];
     //Date operations
     //1: Convert everything to JS date objects
     let birthday_live_a = new Date(this.birthday_modified)
     birthday_live_a.setDate(birthday_live_a.getDate() + 1)
     let birthday_string = birthday_live_a.toISOString().split('T')[0];
     this.target_user.birthday = birthday_string

     this.target_user.avatar = await this.image_replacer();

     //Password operations

     if(this.new_password !== ''){
       this.target_user.password =  this.new_password
     }

     //

     await jagAPI.modifyUser(this.$store.state.token, this.target_id, this.target_user)
     this.getUserInfo(this.target_id);
     this.$emit('please-refresh', this.target_id)

     this.snackbar_toggle=true;
     if (this.target_id === this.$store.state.user.card_id) {
        this.snackbar_toggle=true;
        this.snackbar_text="Votre compte a été modifié avec succès.";
     }else{
        this.snackbar_toggle=true;
         this.snackbar_text="Le compte de " + this.target_user.firstname +" " + this.target_user.lastname +" a été modifié avec succès.";
     }




   }


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
  this.snackbar_toggle=true;
  this.snackbar_text="Vos modifications n'ont pas été prises en compte.";
},
resetValidation () {
  this.$refs.form.resetValidation()
},

async deleteUser(){

  if (this.$store.state.user.card_id === this.target_id) {
    this.snackbar_toggle=true;
    this.snackbar_text="Vous ne pouvez pas supprimer votre propre compte. Demandez à votre boss de le faire.";
  }else{
    await jagAPI.deleteUser(this.$store.state.token, this.target_user.card_id)
    this.$router.push({name:'Trombinoscope'})
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
