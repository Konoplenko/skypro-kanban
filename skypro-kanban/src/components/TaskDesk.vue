<template>
  <div class="main__block">
    <div class="main__content">
      <TaskColumn
        status="Без статуса"
        :tasks="[{theme: 'orange', title: 'Название задачи', date: '30.10.23'}]"
      />
      <TaskColumn
        status="Нужно сделать"
        :tasks="[{theme: 'green', title: 'Название задачи', date: '30.10.23'}]"
      />
      <TaskColumn
        status="В работе"
        :tasks="[{theme: 'purple', title: 'Название задачи', date: '30.10.23'}]"
      />
      <TaskColumn
        status="Тестирование"
        :tasks="[{theme: 'green', title: 'Название задачи', date: '30.10.23'}]"
      />
      <TaskColumn
        status="Готово"
        :tasks="[{theme: 'green', title: 'Название задачи', date: '30.10.23'}]"
      />
    </div>
  </div>
</template>

<script>
import TaskColumn from './TaskColumn.vue';

export default {
  components: {
    TaskColumn
  }
}
</script>
