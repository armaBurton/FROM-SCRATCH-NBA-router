import {
  findByTestId,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import fetch from 'cross-fetch';
import userEvent from '@testing-library/user-event';
import App from './App';
import RobotList from './views/RobotList/RobotList';
import RUARobotProvider from './context/RUARobotProvider';
import { robots } from './dataLarge';
import { fembot } from './dataSmall';

const server = setupServer(
  rest.get('https://randomuser.me/api/?results=10&noinfo', (req, res, ctx) => {
    return res(ctx.json(robots));
  })
);

global.fetch = fetch;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  it('should find "Mandroid or FemBots, find loading, select a card, click into that cards detail, and then click bake to the previous page.', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <RUARobotProvider>
          <App />
        </RUARobotProvider>
      </MemoryRouter>
    );

    screen.getByText(/mandroid or fembot/i);

    screen.getByText(/Beep Beep Boop...Computing/i);

    let card = await screen.findByText(/Mackenzie/i);
    userEvent.click(card);

    card = await screen.findByText(/mackenzie/i);
    screen.getByText(/street/i);
    userEvent.click(card);

    await screen.findByText(/Hermitério/i);
  });

  const fembot = {
    results: [
      {
        gender: 'female',
        name: {
          title: 'Mrs',
          first: 'Salete',
          last: 'Martins',
        },
        location: {
          street: {
            number: 7784,
            name: 'Rua Quatro',
          },
          city: 'Volta Redonda',
          state: 'Paraná',
          country: 'Brazil',
          postcode: 42022,
          coordinates: {
            latitude: '72.5899',
            longitude: '81.4608',
          },
          timezone: {
            offset: '+9:30',
            description: 'Adelaide, Darwin',
          },
        },
        email: 'salete.martins@example.com',
        login: {
          uuid: '699b0549-14a4-494a-acce-1d96ec8f75c2',
          username: 'sadladybug764',
          password: 'dalshe',
          salt: 'XiP2v9Ql',
          md5: 'fca1133b89400d1912e7ad8d5abd7cbf',
          sha1: '790428dc9a92f2ef22b8209cd2dbbb04683c85f8',
          sha256:
            'e40bb592a0c9a31a38ddbaf3a4b1a53e3888cc31861e73ab6a63faa513b81073',
        },
        dob: {
          date: '1990-11-12T04:59:05.635Z',
          age: 32,
        },
        registered: {
          date: '2017-04-18T21:51:08.127Z',
          age: 5,
        },
        phone: '(45) 9350-7851',
        cell: '(27) 2272-8273',
        id: {
          name: '',
          value: null,
        },
        picture: {
          large: 'https://randomuser.me/api/portraits/women/41.jpg',
          medium: 'https://randomuser.me/api/portraits/med/women/41.jpg',
          thumbnail: 'https://randomuser.me/api/portraits/thumb/women/41.jpg',
        },
        nat: 'BR',
      },
    ],
  };

  it('should toggle the dropdown menu, select FemBot, query with "female" search param and return a fembot', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <RUARobotProvider>
          <App />
        </RUARobotProvider>
      </MemoryRouter>
    );

    screen.findByText(/mandroid or fembots/i);
    const dropbox = screen.getByRole('combobox');
    userEvent.click(dropbox);
    expect(screen.getAllByRole('option').length).toBe(3);
    const select = screen.getByRole('option', { name: /fembot/i });
    userEvent.click(select);
    await screen.findAllByAltText(/female/i);
  });
});
