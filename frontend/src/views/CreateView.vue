<template>
  <div class="about">
    <h1>People</h1>
    <div class="peopleList">
      <DataTable :value="people" v-if="people.length > 0 ">
        <Column field="id" header="id" style="color: black; "/>
        <Column field="name" header="Name" style="color: black; "/>
        <Column field="email" header="Email" style="color: black; "/>
        <Column field="eventId" header="EventId" style="color: black;"/>
        <Column header="Actions" style="color: black;">
          <template #body="{ data }">
            <button @click="deletePerson({id:data.id,name:data.name,email:data.email,eventId:data.eventId})">Kustuta</button>
            <button @click="showUpdate(data.id)">Uuenda</button>
        </template>
        </Column>
      </DataTable>
      <div v-else>Sündmused puuduvad</div>
    </div>
  </div>
  <div>
      Name: <input v-model="addName" placeholder="Type here"><br>
      Email: <input v-model="addEmail" placeholder="Type here"><br>
      EventId: <input v-model="addEventId" placeholder="Type here"><br>
      <button @click="addNew">Lisa uus inimene</button><br><br><br>
      <div v-if="update">
        Name: <input v-model="updateName" placeholder="Type here"><br>
        Email: <input v-model="updateEmail" placeholder="Type here"><br>
        EventId: <input v-model="updateEventId" placeholder="Type here"><br>
        <button @click="updatePerson">Uuenda</button><br><br><br>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type People } from '@/models/people';
import { usePeopleStore } from "@/stores/peopleStore";
import { storeToRefs } from "pinia";
import { defineProps, onMounted, watch, ref  } from "vue";
import { useRoute } from "vue-router";
const addName = ref('')
const addEmail = ref('')
const addEventId = ref('')
let update = ref(false);
let updateId = ref(0);
const updateName = ref('')
const updateEmail = ref('')
const updateEventId = ref('')
function addNew(){
  let people: People = {id: 0,
    name: addName.value,
    email: addEmail.value,
    eventId:parseInt(addEventId.value)}
  eventsStore.addPerson(people)
}
function showUpdate(id:number){
  updateId.value = id
  update.value = true
}
function deletePerson(person: People) {
  let people: People = {id: person.id,
    name: "",
    email: "",
    eventId:0}
  eventsStore.deletePerson(people)
  eventsStore.load();
}
function updatePerson(){
  if(updateId){
    let currentPerson: People = {
      id:0,
      name:"",
      email:"",
      eventId:0
    }
    people.value.forEach(person => {
      if(person.id == updateId.value){
        currentPerson.name = person.name
        currentPerson.email = person.email
        currentPerson.eventId = person.eventId
      }
    });
    let person: People = {
      id:updateId.value,
      name:updateName.value || currentPerson.name,
      email:updateEmail.value || currentPerson.email,
      eventId:parseInt(updateEventId.value) || currentPerson.eventId
    }
    eventsStore.updatePerson(person);
    eventsStore.load();
    update.value = false

  }
}
const route = useRoute();

watch(route, (to, from) => {
  if (to.path !== from.path || to.query !== from.query) {
    eventsStore.load();
  }
}, { deep: true });

defineProps<{ title: String }>();
const eventsStore = usePeopleStore();
const { people } = storeToRefs(eventsStore);

onMounted(async () => {
  eventsStore.load();
});
</script>