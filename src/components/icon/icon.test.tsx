import { render } from '@testing-library/react';
import { Icon } from './icon';
import sprite from '../../assets/sprite.svg';

describe('Icon component', () => {
  test('should be rendered correctly', () => {
    render(<Icon name={`${sprite}#basket`} width="14" height="14" />);
  });
});
