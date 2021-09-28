<template>
  <div class="row">
    <column status="inprogress" title="В работе" :tasks="inprogress"></column>
    <column status="checking" title="На проверке" :tasks="checking"></column>
    <column status="done" title="Выполнено" :tasks="done"></column>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
import Column from '@/components/Column';
import {mapActions, mapGetters} from 'vuex';
import dragula from "dragula";

export default {
  name: 'Board',
  components: {
    Column
  },
  computed: {
    ...mapGetters('tasks', ['inprogress', 'checking', 'done'])
  },
  methods: {
    ...mapActions('tasks', ['relocate'])
  },
  mounted() {
    // Drag and drop tasks settings
    dragula([
      document.getElementById('inprogress'),
      document.getElementById('checking'),
      document.getElementById('done')
    ])
        .on('drop', (block, list, source, sibling) => {
          const id = parseInt(block.getAttribute('data-id'));
          const statusBefore = source.id;
          const statusAfter = list.id;
          this.relocate({
            id,
            status: {
              before: statusBefore,
              after: statusAfter
            },
            sibling
          });
        });
  }
}
</script>

<style lang="scss">
/* Dragula classes */
.task.gu-transit {
  background-color: #BEBEBE;
  box-shadow: none;

  & > .task__title {
    visibility: hidden !important;
  }
}

.gu-mirror {
  position: fixed;
  z-index: 9999;
  opacity: 1;
  background-color: #C7F1FF !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 1px rgba(0, 0, 0, 0.25) !important;
  border-radius: 2px;
}

.gu-hide {
  display: none;
}

.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}
</style>