<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ status }}</p>
    </div>
    <div class="cards">
      <template v-if="tasks.length > 0">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :title="task.title"
          :theme="getThemeClass(task.topic)"
          :date="formatDate(task.date)"
        />
      </template>
      <div v-else class="empty-column">
        <p>Нет задач</p>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from './TaskCard.vue'

export default {
  components: {
    TaskCard,
  },
  props: {
    status: String,
    tasks: Array,
  },
  methods: {
    getThemeClass(topic) {
      const themeMap = {
        'Web Design': 'orange',
        Research: 'green',
        Copywriting: 'purple',
      }
      return themeMap[topic] || 'gray'
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date
        .toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        })
        .replace(/\//g, '.')
    },
  },
}
</script>

<style scoped>
.main__column {
  width: 20%;
  margin: 0 auto;
  display: block;
}

.column__title {
  padding: 0 10px;
  margin: 15px 0;
}

.column__title p {
  color: #94a6be;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
  margin: 15px 0;
}

.cards {
  width: 100%;
  display: block;
  position: relative;
  min-height: 100px;
}

.empty-column {
  text-align: center;
  padding: 20px;
  color: #94a6be;
  font-size: 14px;
}

@media screen and (max-width: 1200px) {
  .main__column {
    width: 100%;
    margin: 0 auto;
    display: block;
  }

  .cards {
    width: 100%;
    display: flex;
    overflow-y: auto;
    min-height: 150px;
  }
}
</style>
