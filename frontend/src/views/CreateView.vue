<template>
  <div class="about">
    <h1>People</h1>
    <div class="peopleList">
      <DataTable :value="events" v-if="events.length > 0 ">
        <Column field="id" header="id" style="color: black; "/>
        <Column field="name" header="Name" style="color: black; "/>
        <Column field="email" header="Email" style="color: black; "/>
        <Column field="eventId" header="EventId" style="color: black;"/>
      </DataTable>
      <div v-else>Sündmused puuduvad</div>
    </div>
  </div>
  <div>
      Name: <input v-model="addName" placeholder="Type here"><br>
      Email: <input v-model="addEmail" placeholder="Type here"><br>
      EventId: <input v-model="addEventId" placeholder="Type here"><br>


      <button @click="addNew">Lisa uus inimene</button><br><br><br>

      Id: <input v-model="deleteId" placeholder="Type here"><br>
      <button @click="deletePerson">Kustuta</button>
  </div>
</template>

<script setup lang="ts">
import { type People } from '@/models/people';
import { useEventsStore } from "@/stores/peopleStore";
import { storeToRefs } from "pinia";
import { defineProps, onMounted, watch, ref  } from "vue";
import { useRoute } from "vue-router";
const addName = ref('')
const addEmail = ref('')
const addEventId = ref('')
const deleteId = ref('')
function addNew(){
  let people: People = {id: 0,
    name: addName.value,
    email: addEmail.value,
    eventId:parseInt(addEventId.value)}
  eventsStore.addEvent(people)
}
function deletePerson() {
  let people: People = {id: parseInt(deleteId.value),
    name: "",
    email: "",
    eventId:0}
  eventsStore.deleteEvent(people)
  eventsStore.load();
}
const route = useRoute();

watch(route, (to, from) => {
  if (to.path !== from.path || to.query !== from.query) {
    eventsStore.load();
  }
}, { deep: true });

defineProps<{ title: String }>();
const eventsStore = useEventsStore();
const { events } = storeToRefs(eventsStore);

onMounted(async () => {
  eventsStore.load();
});
</script>