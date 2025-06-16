<template>
  <div class="wrapper">
    <ExitModal />
    <NewCardModal />
    <TaskModal />

    <BaseHeader />
    <main class="main">
      <div class="container">
        <TaskDesk />
      </div>
    </main>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue';
import TaskDesk from '@/components/TaskDesk.vue';
import ExitModal from '@/components/ExitModal.vue';
import NewCardModal from '@/components/NewCardModal.vue';
import TaskModal from '@/components/TaskModal.vue';

export default {
  components: {
    BaseHeader,
    TaskDesk,
    ExitModal,
    NewCardModal,
    TaskModal
  }
}
</script>
