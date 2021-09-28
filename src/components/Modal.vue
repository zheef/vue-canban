<template>
  <transition name="modal">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__header">
            <div class="modal__title">
              <label class="modal__title-label" v-if="showTextarea">
                <textarea v-model="title" class="modal__title-textarea"></textarea>
              </label>
              <span v-else @click="showTextarea = true">{{ title }}</span>
            </div>
            <div class="modal__close" @click="close">
              <i></i>
            </div>
          </div>
          <div class="modal__body">
            <label class="modal__textarea-label">
              <textarea class="modal__textarea" v-model="description" placeholder="Описание"></textarea>
            </label>
          </div>
          <div class="modal__footer">
            <div class="modal__button" @click="save">Сохранить</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
import {mapGetters, mapActions} from 'vuex';

export default {
  name: "Modal",
  data() {
    return {
      title: '',
      description: '',
      showTextarea: false,
      task: null
    }
  },
  created() {
    let id = parseInt(this.$route.params.id);
    if (id) {
      let task = this.taskById(id);
      // Object || undefined
      if (task) {
        this.title = task.title;
        this.description = task.description;
        this.task = task;
      }
    } else {
      throw new Error('Invalid ID');
    }
  },
  computed: {
    ...mapGetters('tasks', ['taskById']),
  },
  methods: {
    ...mapActions('tasks', {saveTask: 'save'}),
    save() {
      if (this.task) {
        this.saveTask({
          id: this.task.id,
          status: this.task.status,
          title: this.title,
          description: this.description
        });
        this.close();
      } else {
        throw new Error('Task is not found');
      }
    },
    close() {
      this.$router.push({name: 'home'});
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/buttonBlue';

.modal {
  &__mask {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(63, 63, 63, 0.45);
    display: table;
    transition: opacity 0.3s ease;
  }

  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &__container {
    width: 600px;
    height: 244px;
    margin: 0 auto;
    padding: 16px 16px 13px;
    background-color: #D4D4D4;
    border-radius: 5px;
    transition: all 0.3s ease;
  }

  &__header {
    font-size: 0;
    line-height: 0;
  }

  &__title {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #212934;
    width: 542px;
    height: 56px;
    max-height: 56px;
    display: inline-block;

    &-label {
      width: 100%;
      display: block;
      margin: 0;
      padding: 0;
    }

    &-textarea {
      width: 100%;
      height: 64px;
      max-height: 64px;
      background: #FFF;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
      border-radius: 2px;
      border: 1px solid #FFF;
      padding: 3px 16px 3px 3px;
      resize: none;
      color: #212934;
      vertical-align: top;
      font-weight: bold;
      box-sizing: border-box;

      &::placeholder {
        color: #989898;
      }

      &.error {
        border-color: #dc3545;
      }
    }
  }

  &__close {
    display: inline-block;
    vertical-align: top;
    margin-left: 12px;

    & > i {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url('~@/assets/images/cancel.png') no-repeat top right;
      cursor: pointer;
    }
  }

  &__body {
    margin: 16px 0;
  }

  &__textarea-label {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  &__textarea {
    width: 100%;
    height: 95px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
    resize: none;
    border: 1px solid #FFF;
    border-radius: 2px;
    padding: 12px;
    color: #212934;
    vertical-align: top;
  }

  &__textarea::placeholder {
    color: #989898;
  }

  &__button {
    @include buttonBlue(99px, '', 7px);
  }
}

/* Transition classes */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
</style>