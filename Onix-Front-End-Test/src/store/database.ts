export const dataTasks = [
  {id: 0, title: 'task1', description: 'Making bed.', date: '2020-01-27T07:00', status: 'done'},
  {id: 1, title: 'task2', description: 'Washing face.', date: '2020-01-27T07:05', status: 'inprogress'},
  {id: 2, title: 'task3', description: 'Drinking a pint of lemon water.', date: '2020-01-27T07:10', status: 'todo'},
  {id: 3, title: 'task4', description: 'Making breakfast.', date: '2020-01-28T07:15', status: 'todo'},
  {id: 4, title: 'task5', description: 'Reviewing my goals.', date: '2020-01-28T07:45', status: 'todo'},
  {id: 5, title: 'task7', description: 'Writing down two to four important tasks for the day.', date: '2020-02-01T07:50', status: 'todo'},
  {id: 6, title: 'task8', description: 'Suit up.', date: '2020-02-02T08:00', status: 'todo'},
  {id: 7, title: 'task9', description: 'Go out.', date: '2020-02-02T08:10', status: 'todo'},
  {id: 8, title: 'task10', description: 'Driving to the office.', date: '2020-02-18T08:15', status: 'todo'},
  {id: 9, title: 'task11', description: 'Talk to the manager.', date: '2020-02-18T08:45', status: 'todo'},
  {id: 10, title: 'task12', description: 'Planing work day.', date: '2020-03-01T08:50', status: 'todo'},
  {id: 11, title: 'task13', description: 'Work hard or easy.', date: '2020-03-29T09:00', status: 'todo'},
];

export const userData = {
  company: 'PROJECTUS',
  personal: {
    avatar: require('@/assets/images/people/avatar.jpg'),
    name: 'Jean Gonzales',
    role: 'Product Ovner'
  },
  tasks: {
    open: 12,
    closed: 372
  },
  notifications: 3
}

export const articles = [
    {
      icon: 0, //"done"
      text:
        'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
      time: '8:40PM',
      comment: '',
      uploads: ''
    },
    {
      icon: 1, //"comment"
      text:
        'Emilee Simchenko commented on Account for teams and personal in bottom style',
      time: '7:32PM',
      comment:
        'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
      uploads: ''
    },
    {
      icon: 2, //"upload"
      text:
        'Darika Samak uploaded 4 files on An option to search in current projectsor in all projects',
      time: '6:02PM',
      comment: '',
      uploads: [
        {
          url: require('@/assets/images/temporary/0.jpg'),
          alt: 'first file'
        },
        {
          url: require('@/assets/images/temporary/1.jpg'),
          alt: 'second file'
        },
        {
          url: require('@/assets/images/temporary/2.jpg'),
          alt: 'third file'
        },
        {
          url: require('@/assets/images/temporary/3.jpg'),
          alt: 'fourth file'
        }
      ]
    }
  ]