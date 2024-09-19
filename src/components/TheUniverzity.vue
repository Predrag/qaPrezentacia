<script setup lang="ts">
import { onMounted, ref } from 'vue'


type UniverzitaType = {
  name: string;
  country: string;
  web_pages: string[];
}

const univerzity = ref<string[]>([])
const univerzityObjekty = ref<UniverzitaType[]>([])

onMounted(async ()=> {
    const response = await fetch('http://universities.hipolabs.com/search?country=slovakia');
const data = await response.json();
univerzity.value = data.map(univerzita => ({
  name: univerzita.name,
  country: univerzita.country,
  web_pages: univerzita.web_pages,
}));
univerzityObjekty.value = univerzity.value;

})

const hladajUniverzituInput = ref<string>('')
const inputValue = ref<string>(hladajUniverzituInput.value)
const vyhladajUniverzitu = ()=> {
  univerzityObjekty.value = univerzity.value.filter(univerzita => univerzita.name.toLowerCase().includes(hladajUniverzituInput.value.toLowerCase()))
}

</script>

<template>
  <h3 data-test-id="nadpis">Univerzity na Slovensku</h3>

  <div id="formularDiv">
    <form @submit.prevent data-test-id="formular">
      <input
        id="univerzitaId"
        v-model="hladajUniverzituInput"
        placeholder="Zadaj univerzitu"
        data-test-id="formular-input"
      />
      <button @click="vyhladajUniverzitu()" data-test-id="formular-btn">Odoslať</button>
    </form>
  </div>
  <div id="tabulkaDiv">
    <table id="tabulkaId" data-test-id="tabulka-univerzit">
      <thead>
      <tr>
        <th style="width: 60%">Univerzita</th>
        <th>Krajina</th>
        <th>Web</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="univerzita in univerzityObjekty" :key="univerzita.name">
        <td :data-test-id="univerzita.name">{{ univerzita.name }}</td>
        <td :data-test-id="univerzita.country">{{ univerzita.country }}</td>
        <td :data-test-id="univerzita.web_pages[0]">
          <a :href="univerzita.web_pages[0]">{{ univerzita.web_pages[0] }}</a>
        </td>
      </tr>
      </tbody>

    </table>
  </div>
</template>

<style scoped>
h3 {
  text-align: center;
}
div[id='formularDiv'] {
  display: flex; justify-content: center;
}
div[id='tabulkaDiv'] {
  display: flex; justify-content: center;
}
table, th, td {
  border: 2px solid #ddd;
  border-collapse: collapse;
}
input[type='text'] {
  width: 200px;
}
input[data-test-id='formular-input'] {
  height: 40px;
  width: 300px;
  margin-left: 10px;
  margin-right: 10px;
}
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100px;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type='submit']:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
