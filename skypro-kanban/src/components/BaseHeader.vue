<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo _show _light">
          <a href="" target="_self"><img src="@/assets/images/logo.png" alt="logo"></a>
        </div>
        <div class="header__logo _dark">
          <a href="" target="_self"><img src="@/assets/images/logo_dark.png" alt="logo"></a>
        </div>
        <nav class="header__nav">
          <button class="header__btn-main-new _hover01" id="btnMainNew">
            <a href="#popNewCard">Создать новую задачу</a>
          </button>
          <a href="#" class="header__user _hover02" @click.prevent="toggleUserMenu">Ivan Ivanov</a>
          <div class="header__pop-user-set pop-user-set" :style="{ display: isUserMenuVisible ? 'block' : 'none' }">
            <p class="pop-user-set__name">Ivan Ivanov</p>
            <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
            <div class="pop-user-set__theme">
              <p>Темная тема</p>
              <input type="checkbox" class="checkbox" name="checkbox">
            </div>
            <button type="button" class="_hover03"><a href="#popExit">Выйти</a></button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isUserMenuVisible: false
    }
  },
  methods: {
    toggleUserMenu() {
      this.isUserMenuVisible = !this.isUserMenuVisible;
    },
    closeUserMenuOnClickOutside(event) {
      if (!this.$el.contains(event.target) && this.isUserMenuVisible) {
        this.isUserMenuVisible = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.closeUserMenuOnClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeUserMenuOnClickOutside);
  }
}
</script>
