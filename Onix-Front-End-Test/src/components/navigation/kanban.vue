<template lang="pug">
  section
    h3 Kanban
    table
      tr(v-for='(element, i) in parsedData' :key='i') 
        td {{i}}
        td(v-for='(task, n) in element' :key='n') {{task}}
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import { EventBusTasks } from '@/main.ts';

  
  @Component
  export default class Kanban extends Vue {
    tasks: TasksInterface;
    parsedData: any;
    taskStatuses: string[];
    constructor() {
      super();
      this.tasks = {};
      this.parsedData = {};
      this.taskStatuses = ['todo', 'inprogress', 'done'];
      this.tasks = {
        'wake up': 
        {
          '7.00AM': { text: 'Making bed.', status: 'todo' },
          '7.05AM': { text: 'Washing face.', status: 'todo' },
          '7.10AM': { text: 'Drinking a pint of lemon water.', status: 'todo' },
          '7.15AM': { text: 'Maging breakfast', status: 'todo' },
          '7.45AM': { text: 'Reviewing my goals.', status: 'todo' },
          '7.50AM': { text: 'Writing down two to four important tasks for the day.', status: 'todo' }
        },
        'go to the work': 
        {
          '8.00AM': { text: 'Suit up.', status: 'todo' },
          '8.10AM': { text: 'Go out.', status: 'todo' },
          '8.15AM': { text: 'Driving to the office.', status: 'todo' },
          '8.45AM': { text: 'Talk to the manager.', status: 'todo' },
          '8.50AM': { text: 'Planning work day.', status: 'todo' },
          '9.00AM': { text: 'Work hard or easy.', status: 'todo' }
        },
      };
    }
    created() {
      this.parsedData = this.dataParsing();
      //EventBusTasks.$emit('get-tasks');
      EventBusTasks.$on('tasks-refresh', (e: TasksInterface) => {
      this.tasks = e;
      //eslint-disable-next-line no-console
      //console.log(Object.keys(e));
      EventBusTasks.$off('tasks-refresh');
      });
    }
    dataParsing() {
      let newData: { 
        todo: string[],
        inprogress: string[],
        done: string[]
        } 
      = {
        todo : [],
        inprogress : [],
        done : []
      };
      Object.entries(this.tasks).forEach( element => {
        Object.entries(element[1]).forEach( el => {
        let status = el[1].status;
        // eslint-disable-next-line no-console
        console.log(status);

          newData.todo.push(el[0] + ' ' + el[1].text);
      });

      });
      return newData;
    }
  }
</script>