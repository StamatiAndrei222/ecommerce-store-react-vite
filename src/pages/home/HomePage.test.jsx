import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { HomePage } from './HomePage';

vi.mock('axios');

describe('HomePage component', () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/products') {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"]
            },
            {
              id: "b1a1f4e2-3c4d-4e5f-8a9b-0c1d2e3f4g5h",
              image: "images/products/wireless-mouse.jpg",
              name: "Ergonomic Wireless Mouse",
              rating: {
                stars: 4.0,
                count: 150
              },
              priceCents: 2599,
              keywords: ["electronics", "computer", "accessories"]
            }
          ]
        }
      };
    });
  });

  it('display the products correct', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );
    const productContainers = await screen.findAllByTestId('product-container');

    expect(productContainers).toHaveLength(2);

    expect(
      within(productContainers[0])
        .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(
      within(productContainers[1])
        .getByText('Ergonomic Wireless Mouse')
    ).toBeInTheDocument();
  });
});