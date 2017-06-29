import React  from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Main   from '../Main'

const Dashboard = (props) => (
  <div>
    <Header {...props} />
    <Main {...props} />
    <Footer />
  </div>
)

export default Dashboard
