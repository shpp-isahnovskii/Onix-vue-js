<template lang="pug">
  td
    div(v-if="day <= 0 || day > lastday" class="day_invisible")
    div(v-else class="calendar-cell")
      div(class="day_val" :class="{ day_today : today === true }") {{day}}
      div {{today}}
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";

@Component
  export default class CalendarCell extends Vue {
    @Prop({default: undefined}) day !:number;
    @Prop({default: undefined}) lastday !:number;
    @Prop({default: false}) today !:boolean;

    constructor() {
      super();
    }
  }
</script>

<style lang="scss">
  .calendar-cell {
    width: 80px;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
  .day_invisible {
    visibility: hidden;
  }
  .day_val {
    border-left: 1px solid rgba(192, 192, 192, 0.5);
    border-bottom: 1px solid rgba(192, 192, 192, 0.5);
    width: 18px;
    height: 16px;
    border-radius: 0 0 0 50%;
    align-self: flex-end;
    text-align: right;
    margin-bottom: 4px;
    font-size: 12px;
  }

  .day_today {
    background-color: rgba(255, 197, 71, 0.126);
  }
  .day_task {
    text-align: left;
    margin: 2px 4px;
    background-color:#f0efee;
    border-radius: 5px;
    padding: 3px 5px;
    cursor: pointer;
    &:last-child {
      margin-bottom: 5px;
    }
  }
</style>