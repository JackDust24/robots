import {cleanup, fireEvent, render} from '@testing-library/react';

import App from '../App';
import MaterialSearch from './MaterialSearch';
import React from 'react';

afterEach(cleanup)

// it('Update text value when button clicked', () => {
//     const { getByText } = render(<MaterialSearch />);

//     expect(getByText(/Initial/i).textContent).toBe("Initial text")

//     fireEvent.click(getByText("Material Check"))

//     expect(getByText(/Jason/).textContent).toBe("Jason")
//  })


//  it('Update text value when when button clicked', () => {
//     const { getByText } = render(<MaterialSearch />);

//     expect(getByText('R$ 0,00')).toBeInTheDocument()

//     fireEvent.click(getByText("Reset"))

//     expect(getByText('R$ 0,01')).toBeInTheDocument()
//  })