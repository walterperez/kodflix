import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import checkPropTypes from 'check-prop-types';
import HamburgerButton from './HamburgerButton';
configure({ adapter: new Adapter() });

describe('Hamburger button', () => {
  describe('Must not get warning from PropTypes', () => {
    it('PropTypes Check', () => {
      const expectedProps = {
        isLogged: false,
        changeLogged: () => {
          return 'Test function';
        },
        isAdmin: false
      };
      const errProps = checkPropTypes(
        HamburgerButton.propTypes,
        expectedProps,
        'props',
        HamburgerButton.name
      );
      expect(errProps).toBeUndefined();
    });
  });

  describe('With no Props', () => {
    it('Must return only HamburgerButton', () => {
      const wrapper = shallow(<HamburgerButton />);
      const HamburgerButtonIcon = wrapper.find(`[data-test='HamburgerButton']`);
      const HamburgerButtonBlurBackground = wrapper.find(
        `[data-test='TranslucidBackground']`
      );
      const HamburgerButtonMenuList = wrapper.find(`[data-test='MenuList']`);
      expect(HamburgerButtonIcon).toBeTruthy();
      expect(
        HamburgerButtonBlurBackground.hasClass('translucid_backgroud')
      ).toBe(false);
      expect(HamburgerButtonMenuList.hasClass('visible')).toBe(false);
    });
  });

  describe('With Props', () => {
    it('Change State when Click HamburgerButtonLogo', () => {
      const wrapper = shallow(<HamburgerButton />);
      const HamburgerButtonIcon = wrapper.find(`[data-test='HamburgerButton']`);

      //WHEN
      const state = wrapper.state();
      expect(HamburgerButtonIcon.length).toBe(1);
      HamburgerButtonIcon.simulate('click');

      //THEN
      expect(wrapper.state()).toEqual({
        isMenuActive: true
      });
    });
  });
});
