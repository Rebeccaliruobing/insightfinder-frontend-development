import React from 'react';
import renderer from 'react-test-renderer';
import Container from './Container';

describe('artui.elements.container', () => {
  it('should be normal div for default props', () => {
    const component = renderer.create(
      (<Container />),
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be responsible if set prop', () => {
    const component = renderer.create(
      (<Container responsive />),
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be no gutter if set prop', () => {
    const component = renderer.create(
      (<Container responsive noGutter />),
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be full height if set prop', () => {
    const component = renderer.create(
      (<Container fullHeight />),
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be merge className if set', () => {
    const component = renderer.create(
      (<Container className="main" />),
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
