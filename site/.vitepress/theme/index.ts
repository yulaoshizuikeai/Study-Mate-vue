import DefaultTheme from 'vitepress/theme'
import 'katex/dist/katex.min.css'
import './custom.css'

import QuizCard from './components/QuizCard.vue'
import StepScoreCard from './components/StepScoreCard.vue'
import SvgViewer from './components/SvgViewer.vue'
import LearningProgressDashboard from './components/LearningProgressDashboard.vue'
import StudyMateDashboard from './components/StudyMateDashboard.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('QuizCard', QuizCard)
    app.component('StepScoreCard', StepScoreCard)
    app.component('SvgViewer', SvgViewer)
    app.component('LearningProgressDashboard', LearningProgressDashboard)
    app.component('StudyMateDashboard', StudyMateDashboard)
  }
}
