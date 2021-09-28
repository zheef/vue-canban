<template>
  <router-link tag="div" class="task" :to="`/task/${task.id}`" :data-id="task.id" @click.stop>
    <div class="task__title">{{ titlePreview }}</div>
  </router-link>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: Object
  },
  computed: {
    titlePreview() {
      let text = this.task.title;
      const limit = 65;
      // Truncate overflow text
      if (text.length > limit) {
        let temp = text.split(' ');
        let end = ' ...';
        while (text.length > limit) {
          temp.pop();
          text = temp.join(' ') + end;
        }
      }
      return text;
    }
  }
}
</script>

<style scoped lang="scss">
.task {
  margin-bottom: 12px;
  background-color: #FFF;
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  min-height: 34px;
  max-height: 52px;
  box-sizing: border-box;
  padding: 8px 17px 8px 12px;
  cursor: pointer;
  overflow: hidden;
}
</style>