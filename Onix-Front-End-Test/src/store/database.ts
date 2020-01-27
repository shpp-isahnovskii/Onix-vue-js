export const dataTasks = [
  { title: '2019-12-31', subtasks: [
    { description: 'Making bed.', time: '07:00', status: 'done'},
    { description: 'Washing face.', time: '07:05', status: 'inprogress'},
    { description: 'Drinking a pint of lemon water.', time: '07:10', status: 'todo'},
    { description: 'Making breakfast.', time: '07:15', status: 'todo'},
    { description: 'Reviewing my goals.', time: '07:45', status: 'todo'},
    { description: 'Writing down two to four important tasks for the day.', time: '07:50', status: 'todo'}
  ]},
  { title: '2020-01-01', subtasks: [
    { description: 'Suit up.', time: '08:00', status: 'todo'},
    { description: 'Go out.', time: '08:10', status: 'todo'},
    { description: 'Driving to the office.', time: '08:15', status: 'todo'},
    { description: 'Talk to the manager.', time: '08:45', status: 'todo'},
    { description: 'Planing work day.', time: '08:50', status: 'todo'},
    { description: 'Work hard or easy.', time: '09:00', status: 'todo'},
  ]}
];

export const newData = [
  {id: 0, title: 'task1', description: 'Making bed.', time: '07:00', status: 'done'},
  {id: 1, title: 'task2', description: 'Washing face.', time: '07:05', status: 'inprogress'},
  {id: 2, title: 'task3', description: 'Drinking a pint of lemon water.', time: '07:10', status: 'todo'},
  {id: 3, title: 'task4', description: 'Making breakfast.', time: '07:15', status: 'todo'},
  {id: 4, title: 'task5', description: 'Reviewing my goals.', time: '07:45', status: 'todo'},
  {id: 5, title: 'task7', description: 'Writing down two to four important tasks for the day.', time: '07:50', status: 'todo'},
  {id: 6, title: 'task8', description: 'Suit up.', time: '08:00', status: 'todo'},
  {id: 7, title: 'task9', description: 'Go out.', time: '08:10', status: 'todo'},
  {id: 8, title: 'task10', description: 'Driving to the office.', time: '08:15', status: 'todo'},
  {id: 9, title: 'task11', description: 'Talk to the manager.', time: '08:45', status: 'todo'},
  {id: 10, title: 'task11', description: 'Planing work day.', time: '08:50', status: 'todo'},
  {id: 11, title: 'task12', description: 'Work hard or easy.', time: '09:00', status: 'todo'},
];

export const userData = {
  company: 'PROJECTUS',
  personal: {
    avatar: require('../assets/images/people/avatar.jpg'),
    name: 'Jean Gonzales',
    role: 'Product Ovner'
  },
  tasks: {
    open: 12,
    closed: 372
  },
  notifications: 3
}