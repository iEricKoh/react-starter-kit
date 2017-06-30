import React       from 'react'
import { expect }  from 'chai'
import { shallow } from 'enzyme'
import Home        from './index'

describe('<Home />', () => {
  it('renders a H3 in Home component', () => {
    const component = shallow(<Home />)
    expect(component.find('h3').text()).to.equal('Home')
  })
})
