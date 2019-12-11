export interface HeaderInterface {
  currentPage: string;
  pages: string[];
  friends: { person: string, alt: string }[];

  changeActive(name:string): void;

  @Watch('$route', { immediate: true, deep: true })
}