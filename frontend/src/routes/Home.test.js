import { mount, shallow } from "enzyme";
import { render, screen } from '@testing-library/react';

import Home from './Home';

describe('Async component', () => {
  test('renders robotData items if request succeeds', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ 
          name: 'p1', 
          image: 'https://robohash.org/Connor Trantow.png?size=120x120',
          price: '300.00',
          stock: 8,
          createdAt: '2021-07-27T23:21:55.470Z',
          material: 'metal',
          id: 101,
        }],
    });
    const wrapper = await mount(<Home />);

    const robotData = wrapper.find('[data-test-id="robotDatas"]');
    expect(robotData.length === 0).toBe(true);
  });
});