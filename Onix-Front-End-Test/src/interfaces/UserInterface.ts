export interface UserInterface {
  company: string
  personal: {
    avatar: string
    name: string
    role: string
  }

  tasks: {
    open: number
    closed: number
  }
  notifications: number
}
