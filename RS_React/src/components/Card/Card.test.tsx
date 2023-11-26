import { describe, expect, it } from 'vitest';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Card from './Card';
import '../../mocks/server';
import { ISearchArrayItem } from '../../types/types';

const mockData: ISearchArrayItem = {
  name: 'testPokemon',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
};

describe('Card', () => {
  it(`renders relevant card data`, () => {
    render(<Card {...mockData} />);
    expect(screen.getByText(/name/i)).toHaveTextContent(`Name: ${mockData.name}`);
  });
  it('triggers an additional API call onclick', () => {
    render(<Card {...mockData} />);
    fireEvent.click(screen.getByText(`Name: ${mockData.name}`));
    expect(window.location.pathname).toBe('/');
  });
});
