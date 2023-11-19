import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import '../../mocks/server';
import { ISearchArrayItem } from '../../types/types';
import { Provider } from 'react-redux';
import { store } from '../../state/store';

const mockData: ISearchArrayItem = {
  name: 'testPokemon',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
};

const MockCard = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Card {...mockData} />
      </BrowserRouter>
    </Provider>
  );
};

describe('Card', () => {
  it(`renders relevant card data`, () => {
    render(<MockCard />);
    expect(screen.getByText(/name/i)).toHaveTextContent(`Name: ${mockData.name}`);
  });
  // describe('Card behavior on click', () => {
  //   it('triggers an additional API call onclick', () => {
  //     render(<MockCard />);
  //     fireEvent.click(screen.getByText(`Name: ${mockData.name}`));
  //     expect(window.location.pathname).(`/${mockData.id}`);
  //   });
  // });
});
