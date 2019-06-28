import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import checkPropTypes from 'check-prop-types';
import Play from './Play';

configure({ adapter: new Adapter() });

describe('Play Component', () => {
  describe('Props checking', () => {
    it('Must not give warning', () => {
      const expectedProps = {
        match: {
          params: {
            idMovie: 'Barman'
          }
        }
      };
      const errorProps = checkPropTypes(
        Play.propTypes,
        expectedProps,
        'props',
        Play.name
      );
      expect(errorProps).toBeUndefined();
    });
  });

  describe('No Props', () => {
    it('Pass props as undefined', () => {
      const propsToPass = undefined;
      const wrapper = shallow(<Play match={propsToPass} />);
      const play = wrapper.find(`[data-test='Play']`);
      expect(play.length).toBe(0);
    });
  });
});
