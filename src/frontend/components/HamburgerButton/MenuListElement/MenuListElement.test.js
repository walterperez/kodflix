import React from 'react';
import { configure, shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import Adapter from 'enzyme-adapter-react-16';
import MenuListElement from './MenuListElement';
configure({ adapter: new Adapter() });

describe('MenuListElement', () => {
  it('Props', () => {
    const expectedProps = {
      text: 'Hello test text',
      icon: 'Hello test icon',
      route: 'Hello test route',
      handleCloseMenuAfterClick: () => 'Hello test handleCloseMenuAfterClick',
      actionCB: undefined
    };
    const ErrorProps = checkPropTypes(
      MenuListElement.propTypes,
      expectedProps,
      'props',
      MenuListElement.name
    );
    expect(ErrorProps).toBeUndefined();
  });
});
