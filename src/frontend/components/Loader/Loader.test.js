import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Loader from './Loader';

configure({ adapter: new Adapter() });

describe('Loader', () => {
  it('Render Snapshot', () => {
    const output = renderer.create(<Loader />);
    expect(output).toMatchSnapshot();
  });

  it('Render', () => {
    const wrapper = shallow(<Loader />);
    const loader = wrapper.find(`[data-test='Loader']`);
    expect(loader.length).toBe(1);
  });
});
