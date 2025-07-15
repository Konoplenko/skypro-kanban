<template>
  <div class="card-view">
    <!-- Модальное окно просмотра/редактирования -->
    <div class="pop-browse" id="popBrowse" :style="{ display: isVisible ? 'block' : 'none' }">
      <div class="pop-browse__container">
        <div class="pop-browse__block">
          <div class="pop-browse__content">
            <!-- Шапка с названием и категорией -->
            <div class="pop-browse__top-block">
              <h3 class="pop-browse__ttl">{{ currentCard.title }}</h3>
              <div class="categories__theme theme-top" :class="`_${currentCard.theme}`">
                <p :class="`_${currentCard.theme}`">{{ getThemeName(currentCard.theme) }}</p>
              </div>
            </div>

            <!-- Статус задачи -->
            <div class="pop-browse__status status">
              <p class="status__p subttl">Статус</p>
              <div class="status__themes">
                <div
                  v-for="status in statuses"
                  :key="status.id"
                  class="status__theme"
                  :class="{
                    '_gray': status.id === currentCard.status,
                    '_hide': status.id !== currentCard.status
                  }"
                  @click="changeStatus(status.id)"
                >
                  <p :class="{ '_gray': status.id === currentCard.status }">{{ status.name }}</p>
                </div>
              </div>
            </div>

            <!-- Основное содержимое -->
            <div class="pop-browse__wrap">
              <form class="pop-browse__form form-browse">
                <div class="form-browse__block">
                  <label for="textArea01" class="subttl">Описание задачи</label>
                  <textarea
                    v-if="isEditing"
                    v-model="currentCard.description"
                    class="form-browse__area"
                    id="textArea01"
                    placeholder="Введите описание задачи..."
                  ></textarea>
                  <textarea
                    v-else
                    class="form-browse__area"
                    id="textArea01"
                    readonly
                    :value="currentCard.description"
                    placeholder="Нет описания"
                  ></textarea>
                </div>
              </form>
              <BaseCalendar v-model="currentCard.dueDate" :readonly="!isEditing" />
            </div>

            <!-- Категория (для мобильной версии) -->
            <div class="theme-down__categories theme-down">
              <p class="categories__p subttl">Категория</p>
              <div class="categories__theme" :class="`_${currentCard.theme}`">
                <p :class="`_${currentCard.theme}`">{{ getThemeName(currentCard.theme) }}</p>
              </div>
            </div>

            <!-- Кнопки действий -->
            <div class="pop-browse__btn-browse" v-if="!isEditing">
              <div class="btn-group">
                <button class="btn-browse__edit _btn-bor _hover03" @click="startEditing">
                  <a href="#">Редактировать задачу</a>
                </button>
                <button class="btn-browse__delete _btn-bor _hover03" @click="deleteCard">
                  <a href="#">Удалить задачу</a>
                </button>
              </div>
              <button class="btn-browse__close _btn-bg _hover01" @click="closeCard">
                <a href="#">Закрыть</a>
              </button>
            </div>

            <div class="pop-browse__btn-edit" v-else>
              <div class="btn-group">
                <button class="btn-edit__edit _btn-bg _hover01" @click="saveCard">
                  <a href="#">Сохранить</a>
                </button>
                <button class="btn-edit__edit _btn-bor _hover03" @click="cancelEditing">
                  <a href="#">Отменить</a>
                </button>
                <button class="btn-edit__delete _btn-bor _hover03" @click="deleteCard">
                  <a href="#">Удалить задачу</a>
                </button>
              </div>
              <button class="btn-edit__close _btn-bg _hover01" @click="closeCard">
                <a href="#">Закрыть</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Карточка для отображения в списке -->
    <TaskCard
      v-if="!isVisible"
      :title="card.title"
      :theme="card.theme"
      :date="formatDate(card.dueDate)"
      @click.native="openCard"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseCalendar from '@/components/BaseCalendar.vue'
import TaskCard from '@/components/TaskCard.vue'

export default {
  components: {
    BaseCalendar,
    TaskCard
  },
  props: {
    card: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        title: '',
        description: '',
        theme: 'orange',
        status: '1',
        dueDate: new Date().toISOString().split('T')[0]
      })
    }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const cardId = route.params.id

    const isVisible = ref(false)
    const isEditing = ref(false)
    const currentCard = ref({ ...props.card })
    const originalCard = ref(null)

    const statuses = [
      { id: '1', name: 'Без статуса' },
      { id: '2', name: 'Нужно сделать' },
      { id: '3', name: 'В работе' },
      { id: '4', name: 'Тестирование' },
      { id: '5', name: 'Готово' }
    ]

    const loadCard = () => {
      if (cardId) {
        const savedCards = JSON.parse(localStorage.getItem('cards') || '[]')
        const foundCard = savedCards.find(c => c.id === cardId)

        if (foundCard) {
          currentCard.value = foundCard
          originalCard.value = { ...foundCard }
        } else {
          router.push('/404')
        }
      }
    }

    const openCard = () => {
      isVisible.value = true
    }

    const closeCard = () => {
      isVisible.value = false
      isEditing.value = false
      router.push('/')
    }

    const startEditing = () => {
      originalCard.value = { ...currentCard.value }
      isEditing.value = true
    }

    const cancelEditing = () => {
      if (originalCard.value) {
        currentCard.value = { ...originalCard.value }
      }
      isEditing.value = false
    }

    const saveCard = () => {
      const savedCards = JSON.parse(localStorage.getItem('cards') || '[]')
      const index = savedCards.findIndex(c => c.id === currentCard.value.id)

      if (index !== -1) {
        savedCards[index] = currentCard.value
      } else {
        savedCards.push(currentCard.value)
      }

      localStorage.setItem('cards', JSON.stringify(savedCards))
      isEditing.value = false
      originalCard.value = { ...currentCard.value }
      props.card = { ...currentCard.value }
    }

    const deleteCard = () => {
      if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
        const savedCards = JSON.parse(localStorage.getItem('cards') || '[]')
        const filteredCards = savedCards.filter(c => c.id !== currentCard.value.id)

        localStorage.setItem('cards', JSON.stringify(filteredCards))
        closeCard()
      }
    }

    const changeStatus = (statusId) => {
      currentCard.value.status = statusId
      if (!isEditing.value) {
        saveCard()
      }
    }

    const getThemeName = (theme) => {
      const themes = {
        orange: 'Web Design',
        green: 'Research',
        purple: 'Copywriting'
      }
      return themes[theme] || 'Неизвестно'
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('ru-RU')
    }

    onMounted(() => {
      if (cardId) {
        loadCard()
        isVisible.value = true
      }
    })

    return {
      cardId,
      isVisible,
      isEditing,
      currentCard,
      statuses,
      openCard,
      closeCard,
      startEditing,
      cancelEditing,
      saveCard,
      deleteCard,
      changeStatus,
      getThemeName,
      formatDate
    }
  }
}
</script>

<style scoped>
.pop-browse {
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 7;
}

.pop-browse__container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}

.pop-browse__block {
  display: block;
  margin: 0 auto;
  background-color: #FFFFFF;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid #D4DBE5;
  position: relative;
}

.pop-browse__content {
  display: block;
  text-align: left;
}

.pop-browse__content .categories__theme {
  opacity: 1;
}

.categories__theme {
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  margin-right: 7px;
  opacity: 0.4;
}

.categories__theme p {
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  white-space: nowrap;
}

.pop-browse__content .theme-down {
  display: none;
  margin-bottom: 20px;
}

.pop-browse__content .theme-top {
  display: block;
}

.pop-browse__top-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.pop-browse__ttl {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}

.pop-browse__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.pop-browse__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}

.pop-browse__btn-browse,
.pop-browse__btn-edit {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
}

.pop-browse__btn-browse button,
.pop-browse__btn-edit button {
  height: 30px;
  margin-bottom: 10px;
  padding: 0 14px;
}

.pop-browse__btn-browse .btn-group button,
.pop-browse__btn-edit .btn-group button {
  margin-right: 8px;
}

.form-browse__block {
  display: flex;
  flex-direction: column;
}

.form-browse__area {
  max-width: 370px;
  width: 100%;
  outline: none;
  padding: 14px;
  background: #EAEEF6;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;
}

.status {
  margin-bottom: 11px;
}

.status__p {
  margin-bottom: 14px;
}

.status__themes {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
}

.status__theme {
  border-radius: 24px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  color: #94A6BE;
  padding: 11px 14px 10px;
  margin-right: 7px;
  margin-bottom: 7px;
  cursor: pointer;
}

.status__theme p {
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
}

._btn-bor {
  border-radius: 4px;
  border: 0.7px solid var(--palette-navy-60, #565EEF);
  outline: none;
  background: transparent;
  color: #565EEF;
}

._btn-bor a {
  color: #565EEF;
}

._btn-bg {
  border-radius: 4px;
  background: #565EEF;
  border: none;
  outline: none;
  color: #FFFFFF;
}

._btn-bg a {
  color: #FFFFFF;
}

@media screen and (max-width: 660px) {
  .pop-browse {
    top: 70px;
  }

  .pop-browse__container {
    padding: 0;
    justify-content: flex-start;
  }

  .pop-browse__block {
    border-radius: 0;
  }

  .pop-browse__wrap {
    display: block;
  }
}

@media screen and (max-width: 495px) {
  .pop-browse__block {
    padding: 20px 16px 32px;
  max-height: 100vh;
    overflow-y: auto;
  }

  .pop-browse__content .theme-down {
    display: block;
    margin-bottom: 20px;
  }

  .pop-browse__content .theme-top {
    display: none;
  }

  .pop-browse__form {
    max-width: 100%;
  }

  .pop-browse__btn-browse button,
  .pop-browse__btn-edit button {
    width: 100%;
    height: 40px;
  }

  .pop-browse__btn-browse .btn-group,
  .pop-browse__btn-edit .btn-group {
    width: 100%;
  }

  .pop-browse__btn-browse .btn-group button,
  .pop-browse__btn-edit .btn-group button {
    margin-right: 0px;
  }

  .form-browse__area {
    max-width: 100%;
    height: 37px;
  }
}
</style>
