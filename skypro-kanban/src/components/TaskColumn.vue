<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ status }}</p>
    </div>
    <div class="cards">
      <TaskCard
        v-for="(task, index) in tasks"
        :key="index"
        :title="task.title"
        :theme="task.theme"
        :date="task.date"
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
  }
}
</script>
