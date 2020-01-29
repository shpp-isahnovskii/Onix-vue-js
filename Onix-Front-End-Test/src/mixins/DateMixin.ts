import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ListMixin extends Vue {
  /* return time value from the database */
  getTime(time: string) { //tasks.vue,
    return time.slice(11);
  }
  /* return date value from the database */
  getDate(time: string) { //tasks.vue,
    return time.slice(0, 10);
  }
  /* return more readable formatting for the date input */
  dateFormating(date: string) { //tasks.vue,
    return date.split("-").reverse().join('.');
  }
}