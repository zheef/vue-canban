<template>
  <div class="col-4">
    <div class="column">
      <div class="column__title">{{ title }}</div>
      <div class="tasks" :id="status">
        <task v-for="task in tasks" :task="task" :key="task.id"></task>
      </div>
      <div class="buttons" v-if="hidden">
        <div class="button-add" @click="showForm">
          <span class="button-add__icon"></span>
          <span class="button-add__text">Добавить еще одну карточку</span>
        </div>
      </div>
      <form action="#" class="new-task__form" v-else>
        <label class="new-task__textarea-label">
          <textarea :class="textareaClasses" placeholder="Введите текст карточки" v-model="taskTitle"></textarea>
        </label>
        <div class="new-task__error text-danger" v-if="textareaError">{{ errorText }}</div>
        <div class="new-task__buttons">
          <div class="button-add active" @click="newTask">
            <span class="button-add__text">Добавить карточку</span>
          </div>
          <div class="button-cancel" @click="hideForm">
            <span class="button-cancel__icon"></span>
            <span class="button-cancel__text">Отмена</span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
import Task from '@/components/Task';
import {mapActions} from 'vuex';

export default {
  name: 'Column',
  props: {
    title: String,
    status: String,
    tasks: Array
  },
  data() {
    return {
      // hide new task form
      hidden: true,
      taskTitle: '',
      textareaError: false,
      errorText: ''
    }
  },
  computed: {
    textareaClasses() {
      return {
        'new-task__textarea': true,
        'error': this.textareaError
      }
    }
  },
  components: {
    Task
  },
  methods: {
    ...mapActions('tasks', {addTask: 'add'}),
    showForm() {
      this.hidden = false;
      this.$nextTick(() => {
        // Set focus to textarea
        this.$el.querySelector('.new-task__textarea').focus();
      });
    },
    newTask() {
      // No title
      if (this.taskTitle.length === 0) {
        this.errorText = 'Поле обязательно для заполнения';
        this.textareaError = true;
        return false;
      }
      // Remove spaces, new lines and other symbols
      if (this.taskTitle.replace(/\s+/, '').length === 0) {
        this.taskTitle = '';
        this.errorText = 'Поле обязательно для заполнения';
        this.textareaError = true;
        return false;
      }
      // Title is too long
      if (this.taskTitle.length > 75) {
        this.errorText = 'Текст не более 75 символов';
        this.textareaError = true;
        return false;
      }
      this.errorText = '';
      // Add new task
      this.addTask({
        title: this.taskTitle,
        description: '',
        status: this.status
      });
      // Hide and reset form
      this.hidden = true;
      this.taskTitle = '';
    },
    hideForm() {
      // Hide and reset form
      this.hidden = true;
      this.taskTitle = '';
      this.textareaError = false;
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/css/buttonTransparent";

.column {
  padding: 12px;
  border-radius: 5px;
  background: #D4D4D4;
  width: 300px;
  margin: 0 auto;

  &__title {
    color: #404B5A;
  }
}

/* Tasks block */
.tasks {
  padding-top: 12px;
}

/* New task */
.new-task {
  &__form {
    position: relative;
  }

  &__textarea-label {
    width: 100%;
    display: block;
    margin: 0 0 16px;
  }

  &__textarea {
    width: 100%;
    height: 52px;
    background: #FFF;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    border: 1px solid #FFF;
    padding: 8px 17px 8px 12px;
    resize: none;
    color: #212934;
    vertical-align: top;

    &::placeholder {
      color: #989898;
    }

    &.error {
      border-color: #dc3545;
    }
  }

  &__error:before {
    content: "";
    position: absolute;
    top: 50%;
    margin-top: -5px;
    left: -10px;
    border: 5px solid transparent;
    border-right-color: #FFF;
  }

  &__error {
    border: 1px solid #FFF;
    border-radius: 2px;
    position: absolute;
    top: 12px;
    left: 280px;
    width: 260px;
    height: 28px;
    background: #FFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 1px rgba(0, 0, 0, 0.25);
    padding: 4px;
    z-index: 1;
    color: #dc3545;
    text-align: center;
  }

  &__buttons {
    font-size: 0;
  }
}

.button-add {
  @include buttonTransparent(256px, '~@/assets/images/plus.png');
}

.button-cancel {
  @include buttonTransparent(105px, '~@/assets/images/cancel.png');
  margin-left: 11px;
}
</style>