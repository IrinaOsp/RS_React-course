import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import '../../mocks/server';
import { ISearchResponseItem } from '../../types/types';

const mockData: ISearchResponseItem = {
  height: 11,
  id: 5,
  name: 'charmeleon',
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
  },
  weight: 190,
};

const MockCard = () => {
  return (
    <BrowserRouter>
      <Card
        height={mockData.height}
        id={mockData.id}
        name={mockData.name}
        sprites={{
          front_default: mockData.sprites.front_default,
        }}
        weight={mockData.weight}
      />
    </BrowserRouter>
  );
};

describe('Card', () => {
  it(`renders relevant card data`, () => {
    render(<MockCard />);
    expect(screen.getByText(/name/i)).toHaveTextContent(`Name: ${mockData.name}`);
    expect(screen.getByText(/id/i)).toHaveTextContent(`ID: ${mockData.id}`);
    expect(screen.getByText(/height/i)).toHaveTextContent(`Height: ${mockData.height}`);
    expect(screen.getByText(/weight/i)).toHaveTextContent(`Weight: ${mockData.weight}`);
    expect(screen.getByAltText(/img/i)).toHaveAttribute('src', mockData.sprites.front_default);
  });
  // describe('Card behavior on click', () => {
  //   it('triggers an additional API call onclick', () => {
  //     render(<MockCard />);
  //     fireEvent.click(screen.getByText(`Name: ${mockData.name}`));
  //     expect(window.location.pathname).(`/${mockData.id}`);
  //   });
  // });
});
