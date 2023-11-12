import { HttpResponse, http } from 'msw';
import { baseURL } from '../data/data';

const items = [
  {
    height: 7,
    id: 9,
    name: 'bulbasaurTest',
    weight: 69,
    base_experience: 64,
    abilities: [{ ability: { name: 'overgrow' } }],
    held_items: [],
    sprites: {
      front_default: 'img',
      other: {
        'official-artwork': {
          front_default: 'img',
        },
      },
    },
  },
  {
    height: 10,
    id: 10,
    name: 'ivysaurTest',
    sprites: { front_default: 'img' },
    weight: 130,
  },
  {
    height: 20,
    id: 11,
    name: 'venusaurTest',
    sprites: { front_default: 'img' },
    weight: 1000,
  },
  {
    height: 6,
    id: 12,
    name: 'charmanderTest',
    sprites: { front_default: 'img' },
    weight: 85,
  },
];

export const handlers = [
  http.get(`${baseURL}:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json(items.filter((item) => item.id === +id)[0]);
  }),

  http.get(`${baseURL}`, ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');
    if (!limit || !offset) return new HttpResponse(null, { status: 404 });

    return HttpResponse.json({
      count: 1292,
      results: [
        {
          name: 'bulbasaurTest',
          url: `${baseURL}9`,
        },
        {
          name: 'ivysaurTest',
          url: `${baseURL}10`,
        },
        {
          name: 'venusaurTest',
          url: `${baseURL}11`,
        },
        {
          name: 'charmanderTest',
          url: `${baseURL}12`,
        },
      ],
    });
  }),
  // http.get(`${baseURL}10`, () => {
  //   return HttpResponse.json({
  //     id: 10,
  //     name: 'PikachuTest',
  //     height: 40,
  //     weight: 6,
  //     base_experience: 112,
  //     abilities: [{ ability: { name: 'static' } }, { ability: { name: 'voltorb' } }],
  //     held_items: [{ item: { name: 'item1' } }, { item: { name: 'item2' } }],
  //     sprites: {
  //       other: {
  //         'official-artwork': { front_default: 'pikachu.jpg' },
  //       },
  //     },
  //   });
  // }),
];
