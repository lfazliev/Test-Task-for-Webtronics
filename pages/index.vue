<template>
  <div class="tableContainer">
    <div>
      <label>Filter by status:</label>
      <select v-model="filterStatus">
        <option value="">All</option>
        <option value="Открыт">Open</option>
        <option value="Закрыт">Closed</option>
      </select>
    </div>
    <table>
      <thead>
        <tr>
          <th @click="sortBy('authorId')">Ticket author <span
              :style="{ opacity: sortByColumn == 'authorId' ? 1 : 0 }">↓</span></th>
          <th @click="sortBy('status')">Status <span :style="{ opacity: sortByColumn == 'status' ? 1 : 0 }">↓</span></th>
          <th @click="sortBy('title')">Title <span :style="{ opacity: sortByColumn == 'title' ? 1 : 0 }">↓</span></th>
          <th @click="sortBy('message')">Report <span :style="{ opacity: sortByColumn == 'message' ? 1 : 0 }">↓</span>
          </th>
          <th @click="sortBy('createdAt')">Creation date <span
              :style="{ opacity: sortByColumn == 'createdAt' ? 1 : 0 }">↓</span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in filteredTickets" :key="ticket.id">
          <td>

            <nuxt-link :to="`/profile?id=${ticket.authorId}`"> {{ ticket.authorName }}</nuxt-link>

          </td>
          <td>{{ ticket.status }}</td>
          <td>{{ ticket.title }}</td>
          <td>{{ ticket.message }}</td>
          <td>{{ formatDate(ticket.createdAt) }}</td>
          <td>

            <nuxt-link :to="`/ticket?id=${ticket.id}`">More</nuxt-link>

          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
const userStore = useUserStore()
const { auth } = storeToRefs(userStore)
const tickets = ref([] as Ticket[])
const sortByColumn = ref('')
const filterStatus = ref('')
const filteredTickets = computed(() => {
  return sortedTickets.value.filter((ticket: Ticket) => {
    return (!filterStatus.value || ticket.status === filterStatus.value);
  });
})
const fetchTickets = async () => {
  let token
  if (process.client) {
    token = localStorage.getItem('token')
  }
  if (!token) { auth.value = false; navigateTo('/login'); return }
  clearNuxtData()
  const { data: ticketsData } = await useFetch('/api/tickets', {
    headers:
      { "Authorization": token }


  }
  )

  tickets.value = ticketsData.value
}
fetchTickets()
type SortableColumns = 'id' | 'authorId' | 'authorName' | 'title' | 'message' | 'createdAt' | 'details' | 'status';

const sortedTickets = computed(() => {
  if (sortByColumn.value && (sortByColumn.value as SortableColumns)) {
    const column = sortByColumn.value as SortableColumns;
    return tickets.value.slice().sort((a: Ticket, b: Ticket) => {
      return a[column] > b[column] ? 1 : -1;
    });
  }
  return tickets.value;
});

const sortBy = (column: string) => {
  sortByColumn.value = column;
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
}
definePageMeta({
  middleware: ["auth"]
})

</script>
<style lang="scss" scoped>
.tableContainer {
  margin: 10px;

  table {
    border-spacing: 0;
    width: 100%;


    th,
    td {
      padding: 10px;
      text-align: center;
      border-right: 1px solid black;
      max-width: 60px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    th:last-of-type {
      cursor: default;
    }

    th:last-of-type,
    td:last-of-type {
      border: 0;
    }


    th,
    td:last-of-type {
      cursor: pointer;

    }

    td:last-of-type,
    td:first-of-type {
      text-decoration: underline;

    }

  }
}
</style>