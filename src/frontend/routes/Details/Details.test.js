import React from 'react';
import checkPropTypes from 'check-prop-types';
import { Details } from './Details';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Details Route Component', () => {
  describe('Must not throw a warning', () => {
    const expectedPropTypes = {
      match: {
        params: { idMovie: 'Batman' }
      }
    };
    const propsErr = checkPropTypes(
      Details.propTypes,
      expectedPropTypes,
      'props',
      Details.name
    );
    expect(propsErr).toBeUndefined();
  });

  describe('Have no Props', () => {
    it('Render Loading Component when State isLoading = True ', () => {
      const wrapper = shallow(<Details />);
      const Loader = wrapper.find(`[data-test='Loader']`);
      expect(Loader).toBeTruthy();
    });
  });

  describe(' Have Props', () => {
    it('Render Details if there is Data in the state', () => {
      const wrapper = shallow(<Details />);
      //When
      wrapper.setProps({
        match: {
          params: {
            idMovie: 'Batman'
          }
        }
      });
      //And
      wrapper.setState({
        movieName: 'Batman',
        movieID: 'Batman',
        movieDescription: 'This my movie description'
      });
      //Then
      const DetailsWrapper = wrapper.find(`[data-test='Details']`);
      expect(DetailsWrapper.find('h1').text()).toBe('Batman');
      expect(DetailsWrapper.find('p').text()).toBe('This my movie description');
      expect(DetailsWrapper.find('img')).toBeTruthy();
    });
  });
});
