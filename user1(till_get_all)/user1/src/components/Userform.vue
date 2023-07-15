<script setup>
  import { reactive, ref, watch } from "vue";
  import ky from 'ky';
  import { required, email } from '@vuelidate/validators';
  import { useVuelidate } from "@vuelidate/core";
  import DropdownVue from "./Dropdown.vue";
  import Calendar from "primevue/calendar";
  import Dialog from "primevue/dialog";

  const username = ref('');
  const userEmail = ref('');
  const gender = ref('');
  const status = ref('');
  const timestamp = ref('');
  const visible = ref(false);
  const result = ref('');

  const rules = {
    username: { required},
    userEmail: { required, email},
    gender: { required},
    status: { required},
    timestamp: { required},
  };

  const v$ = useVuelidate(rules, {username:username,userEmail:userEmail,gender:gender,status:status,timestamp:timestamp});

  const printUserData = async () => {
    
    if (v$.value.$invalid) {
      // validation error
      let res = "";
      for(let i=0;i<v$.value.$silentErrors.length;i++){
        res += v$.value.$silentErrors[i].$uid + ",";
      }
      updateUI(res);
      return;
    }
    const userData = {
        name: username.value,
        email: userEmail.value,
        gender: gender.value,
        status: status.value,
        timestamp: timestamp.value
    };

  try {
    // fetching api
    const response = await ky.post('/api/users', { json: userData });

    if (response.ok) {
      const data = await response.json();
      const successMessage = `User data saved successfully`;
      updateUI(successMessage);

      //clearing the boxes
      username.value = '';
      userEmail.value = '';
      gender.value = '';
      status.value = '';
      timestamp.value = '';
  
    } else {
      const errorMessage = `Error: ${response.status}`;
      updateUI(errorMessage);
    }
  } catch (error) {
    const errorMessage = `Error: ${error.message}`;
    updateUI(errorMessage);
  }
};

const updateUI = (message) => {
  result.value = message;
};

const gender_action = (n) => {
  gender.value = n;
  };

const status_action = (n) => {
  status.value = n;
}  
  
</script>
  
<template>
  <div>
    <h3>Please fill User's detail:</h3>
  </div>
  <div class="card">
    <div class="align-items-center">
      <label for="username" class="p-sr-only">Username</label>
      <InputText id="username" placeholder="Username" v-model="username"/>
    </div>
    <div class="align-items-center ">
      <label for="email" class="p-sr-only">Email</label>
      <InputText id="email" placeholder="Email" v-model="userEmail"/>
    </div>
    <div class="align-items-center ">
      <DropdownVue @res="gender_action" 
        :tasks="[
          { name: 'Male', code: 'male' },
          { name: 'Female', code: 'female' }
        ]"
        :task-name="'Gender'"
      />
    </div>
    <div class="align-items-center">
      <DropdownVue @res="status_action" 
        :tasks="[
          { name: 'Active', code: 'active' },
          { name: 'Inactive', code: 'inactive' }
        ]"
        :task-name="'Status'"
      />
    </div>
    <div class="align-items-center">
      <Calendar v-model="timestamp" placeholder="Timestamp" class="w-full md:w-13rem" showIcon />
    </div>
    <div class="card flex justify-content-center">
       <!-- dialog component is used & modified -->
      <Button label="Submit" icon="pi pi-external-link" @click="visible = true; printUserData()"/>

      <Dialog v-model:visible="visible" modal header="" :style="{ width: '50vw' }">
             <p>
              {{result}} 
             </p> 
      </Dialog>
    </div>
  </div>
</template>

<style scoped>
  h3 {
    margin: 1rem auto 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
    .card div {
    margin: 0 0 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>


  