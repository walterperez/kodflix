import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import checkPropTypes from 'check-prop-types';
import Movie from './Movie';

configure({ adapter: new Adapter() });

describe('Movie Component', () => {
  describe('Props Types', () => {
    it('Must not give warning', () => {
      const expectedProps = {
        id: 'Batman',
        name: 'Batman'
      };
      const errorProps = checkPropTypes(
        Movie.propTypes,
        expectedProps,
        'props',
        Movie.name
      );
      expect(errorProps).toBeUndefined();
    });
  });

  describe('No Props', () => {
    it('No Props', () => {
      const wrapper = shallow(<Movie />);
      expect(wrapper.find(`[data-test='Movie']`).length).toBe(0);
    });

    it('No Props Snapshot', () => {
      const output = renderer.create(<Movie />);
      expect(output).toMatchSnapshot();
    });
  });

  describe('With Props', () => {
    const propsToPass = {
      id: 'Batman',
      name: 'Batman'
    };

    it('expected props', () => {
      const wrapper = shallow(
        <Movie id={propsToPass.id} name={propsToPass.name} />
      );
      expect(wrapper.find(`[data-test='Movie']`).length).toBe(1);
    });

    it('Expected props Snapshot', () => {
      const output = renderer.create(
        <Router>
          <Movie id={propsToPass.id} name={propsToPass.name} />
        </Router>
      );
      expect(output).toMatchSnapshot();
    });
  });
});

export default Movie;
