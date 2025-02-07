import { type People } from "@/models/people";
import { ref } from "vue";
import { defineStore } from "pinia";
import useApi, { useApiRawRequest } from "@/models/api";

export const useEventsStore = defineStore('peopleStore', () => {
  const apiGetEvents = useApi<People[]>('people');
  const events = ref<People[]>([]);
  let allPeople: People[] = [];

  const loadEvents = async () => {
    await apiGetEvents.request();

    if (apiGetEvents.response.value) {
      return apiGetEvents.response.value;
    }
    return [];
  };

  const load = async () => {
    allPeople = await loadEvents();
    events.value = allPeople;
  };
  const getEventById = (id: Number) => {
    return allPeople.find((people) => people.id === id);
  };


  const addEvent = async (event: People) => {
    console.log(event)
    const apiAddEvent = useApi<People>('people', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }); 
    
    await apiAddEvent.request();
    if (apiAddEvent.response.value) {
      load();      
    }
  };
  const updateEvent = async (event: People) => {
    const apiUpdateEvent = useApi<People>('people/' + event.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    await apiUpdateEvent.request();
    if (apiUpdateEvent.response.value) {
      load();
    }    
  };


  const deleteEvent = async (event: People) => {
    const deleteEventRequest = useApiRawRequest(`people/${event.id}`, {
      method: 'DELETE',
    });
    const res = await deleteEventRequest();
    if (res.status === 204) {
      for (let index = 0; index < events.value.length; index++) {
        const element = events.value[index];
        if (element.id == event.id){
          events.value.splice(element.id, 1);
        }
      }
      let id = events.value.indexOf(event);
      if (id !== -1) {
        events.value.splice(id, 1);
      }

      id = events.value.indexOf(event);

      if (id !== -1) {
        events.value.splice(id, 1);
      }
      load();
    }
  };

  return { events, load, getEventById, addEvent, updateEvent, deleteEvent };
});