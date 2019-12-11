export interface SidebarInterface {
    user: {
    company: string;

    personal: {
      avatar: string;
      name: string;
      role: string;
    },

    tasks: {
      open: number;
      closed: number;
    },
    notifications: number;
  }
  hideSidebar: boolean;
}