import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Searchbar from './Searchbar';

test('calls searchCallback whenever search input changes', async() => {
  userEvent.setup();
  const searchCallback = jest.fn();
  const placeholderText = 'Search questions...';
  const typedText = 'hello world';

  render(<Searchbar placeholderText={placeholderText} ariaControls='questions-list' ariaLabel='Search questions' searchCallback={searchCallback} />);

  await userEvent.type(screen.getByPlaceholderText(placeholderText), typedText);

  expect(searchCallback).toHaveBeenCalledWith(typedText);
});

