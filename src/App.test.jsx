import { findByTestId, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import fetch from 'cross-fetch';
import userEvent from '@testing-library/user-event';
import App from './App';
import RobotList from './views/RobotList/RobotList';
import RUARobotProvider from './context/RUARobotProvider';
import { robots } from './mocks/robots';

const server = setupServer(
  rest.get('https://randomuser.me/api/?results=10&noinfo', (req, res, ctx) => {
    console.log(ctx.json('setupServer', robots));
    return res(ctx.json(robots));
  })
)

global.fetch = fetch;

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('App', () => {
  it.skip('should be a passing test', () => { });

  it('should find "Mandroid or FemBots', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <RUARobotProvider>
          <App>
            <RobotList />
          </App>
        </RUARobotProvider>
      </MemoryRouter>
    );

    await screen.findByText(/Beep Beep Boop...Computing/i);
    screen.getByText(/mandroid or fembot/i);
    // await screen.findByText(/Charlene Moura/i);
    // const card = await screen.findByTestId(3);
    let link = '';

    await waitFor(() => {
      screen.findAllByTestId(3);
      screen.findByText(/Charlene Moura/i);
    })

    await waitFor(() => { 
      link = screen.findByTestId(7);
      // userEvent.click(link);
    })

    
  })
})
