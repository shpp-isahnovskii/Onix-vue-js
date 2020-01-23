export const dataTask = [
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