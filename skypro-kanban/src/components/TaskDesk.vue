<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <div v-if="loading" class="loading-message">Данные загружаются...</div>
          <template v-else>
            <TaskColumn
              v-for="column in columns"
              :key="column.status"
              :status="column.status"
              :tasks="getTasksByStatus(column.status)"
            />
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import TaskColumn from './TaskColumn.vue';
import { tasks } from './mocks/tasks.js';

export default {
  components: {
    TaskColumn
  },
  data() {
    return {
      loading: true,
      tasks: [],
      columns: [
        { status: 'Без статуса' },
        { status: 'Нужно сделать' },
        { status: 'В работе' },
        { status: 'Тестирование' },
        { status: 'Готово' }
      ]
    };
  },
  methods: {
    getTasksByStatus(status) {
      return this.tasks.filter(task => task.status === status);
    },
    loadTasks() {
      setTimeout(() => {
        this.tasks = tasks;
        this.loading = false;
      }, 1000);
    }
  },
  created() {
    this.loadTasks();
  }
};
</script>
