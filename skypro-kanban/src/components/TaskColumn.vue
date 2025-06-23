<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ status }}</p>
    </div>
    <div class="cards">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :title="task.title"
        :theme="getThemeClass(task.topic)"
        :date="formatDate(task.date)"
      />
    </div>
  </div>
</template>

<script>
import TaskCard from './TaskCard.vue';

export default {
  components: {
    TaskCard
  },
  props: {
    status: String,
    tasks: Array
  },
  methods: {
    getThemeClass(topic) {
      const themeMap = {
        'Web Design': 'orange',
        'Research': 'green',
        'Copywriting': 'purple',
      };
      return themeMap[topic] || 'gray';
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).replace(/\//g, '.');
    }
  }
};
</script>
