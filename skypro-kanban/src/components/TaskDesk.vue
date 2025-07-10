<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <div v-if="loading" class="loader-container">
            <div class="loader"></div>
            <p>Загрузка задач...</p>
          </div>
          <template v-else>
            <template v-if="hasTasks">
              <TaskColumn
                v-for="column in columns"
                :key="column.status"
                :status="column.status"
                :tasks="getTasksByStatus(column.status)"
              />
            </template>
            <div v-else class="no-tasks-message">
              <p>Задач нет</p>
            </div>
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
  computed: {
    hasTasks() {
      return this.tasks.length > 0;
    }
  },
  methods: {
    getTasksByStatus(status) {
      return this.tasks.filter(task => task.status === status);
    },
    loadTasks() {
      setTimeout(() => {
        this.tasks = tasks;
        this.loading = false;
      }, 1500);
    }
  },
  created() {
    this.loadTasks();
  }
};
</script>

<style scoped>
.main__block {
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
}

.main__content {
  width: 100%;
  display: flex;
}

.loader-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.loader {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #565eef;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-tasks-message {
  width: 100%;
  text-align: center;
  padding: 40px 0;
  font-size: 18px;
  color: #94A6BE;
}

@media screen and (max-width: 1200px) {
  .main__block {
    width: 100%;
    margin: 0 auto;
    padding: 40px 0 64px;
  }

  .main__content {
    display: block;
  }
}

@media screen and (max-width: 495px) {
  .container {
    width: 100%;
    padding: 0 16px;
  }
}
</style>
