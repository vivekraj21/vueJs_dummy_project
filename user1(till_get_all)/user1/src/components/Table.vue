<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {getData} from "./UserData.vue"
import "/node_modules/primeflex/primeflex.css";
    
const dataset = ref();

onMounted(() => {
   getData().then((data) => (dataset.value = data));
});

</script>

<template>
<div class="flex align-items-center justify-content-center">
    <h3>User's Detail</h3>
</div>

<div class="card">
    <DataTable :value="dataset" showGridlines tableStyle="min-width: 80rem;" class="flex align-items-center justify-content-center">
        <Column  field="id" header="Id"></Column>
        <Column  field="name" header="Name"></Column>
        <Column  field="email" header="Email"></Column>
        <Column  field="gender" header="Gender"></Column>
        <Column  field="status" header="Status"></Column>
        <Column  field="timestamp" header="Timestamp"></Column>
    </DataTable>
</div>
</template>

<style scoped>

</style>