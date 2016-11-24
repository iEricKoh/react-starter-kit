import App     from '../components/App'
import About   from '../components/About'
import Inbox   from '../components/Inbox'
import NoMatch from '../components/NoMatch'
import Home    from '../components/Home'

export default {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'about', component: About },
    { path: 'inbox', component: Inbox },
    { path: '*', component: NoMatch },
  ]
}
