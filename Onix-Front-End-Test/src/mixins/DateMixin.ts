import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DateMixin extends Vue {
  /* return time value from the database */
  getTime(time: string) {
    return time.slice(11);
  }
  /* return date value from the database */
  getDate(time: string) {
    return time.slice(0, 10);
  }
  /* return more readable formatting for the date input */
  dateFormating(date: string) {
    return date.split("-").reverse().join('.');
  }
}