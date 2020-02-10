import { createModule, mutation, action, extractVuexModule } from "vuex-class-component";
import { ActivityInterface } from "@/interfaces/ActivityInterface.ts"

const VuexModule = createModule({
  namespaced: "activity",
  strict: false,
})

export class ActivityStore extends VuexModule {

  private articles : ActivityInterface[] = [
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
}