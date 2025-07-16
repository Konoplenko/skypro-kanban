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
import BaseHeader from '@/components/BaseHeader.vue'
import TaskDesk from '@/components/TaskDesk.vue'
import ExitModal from '@/components/ExitModal.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import TaskModal from '@/components/TaskModal.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    BaseHeader,
    TaskDesk,
    ExitModal,
    NewCardModal,
    TaskModal
  },
  setup() {
    const router = useRouter()

    onMounted(() => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (!userInfo) {
        router.push('/login')
      }
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:before,
*:after {
  box-sizing: border-box;
}

a,
a:visited {
  text-decoration: none;
  cursor: pointer;
}

button,
._btn {
  cursor: pointer;
  outline: none;
}

ul li {
  list-style: none;
}

@keyframes card-animation {
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: auto;
    opacity: 1;
  }
}
html,
body {
  width: 100%;
  height: 100%;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  color: #000000;
}

.wrapper {
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #f1f1f1;
}

.container {
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
}

._hover01:hover {
  background-color: #33399b;
}

._hover02:hover,
.header__user:hover {
  color: #33399b;
}
._hover02:hover::after,
.header__user:hover::after {
  border-left-color: #33399b;
  border-bottom-color: #33399b;
}

._hover03:hover {
  background-color: #33399b;
  color: #ffffff;
}
._hover03:hover a {
  color: #ffffff;
}

.pop-user-set:target,
.pop-exit:target,
.pop-new-card:target,
.pop-browse:target {
  display: block;
}

._orange {
  background-color: #ffe4c2;
  color: #ff6d00;
}

._green {
  background-color: #b4fdd1;
  color: #06b16e;
}

._purple {
  background-color: #e9d4ff;
  color: #9a48f1;
}

._gray {
  background: #94a6be;
  color: #ffffff;
}

._active-category {
  opacity: 1 !important;
}

.pop-wrap {
  position: relative;
  top: 0;
  left: 0;
}

.subttl {
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.main {
  width: 100%;
  background-color: #eaeef6;
}

@media screen and (max-width: 495px) {
  .container {
    width: 100%;
    padding: 0 16px;
  }
}
</style>
