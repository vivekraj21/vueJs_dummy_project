<script setup>

import { ref} from "vue";

import Company_header from './components/Header.vue'
import Dropdown from './components/Dropdown.vue';
import Userform from './components/Userform.vue';
import TableVue from "./components/Table.vue";

const showUserForm = ref('');

function action(n){
    showUserForm.value = n;
}


</script>

<template>
  <header>
    <div class="wrapper">
      <Company_header 
      img_address="https://media.licdn.com/dms/image/D560BAQGVq1R83J6HzA/company-logo_200_200/0/1664773714252?e=2147483647&v=beta&t=wk6oB8zw1MaMoriKncAas7wXuMIOaxiOUxKDb6UeFYY"
      company="FinoliTech" />
    </div>
  </header>

  <main>
    <Dropdown @res="action" 
    :tasks="[
      { name: 'Create a user', code: 'createUser' },
      { name: 'Get all user', code: 'getAllUser' },
      { name: 'Search by User name', code: 'getByUsername'}
    ]"
    :task-name="'Pick a Task'"
    />
    <Userform v-if="showUserForm==='createUser'"/>
    <TableVue v-if="showUserForm==='getAllUser'"/>
    <TableVue v-if="showUserForm==='getByUsername'" />
  </main>
</template>

<style scoped>

</style>
