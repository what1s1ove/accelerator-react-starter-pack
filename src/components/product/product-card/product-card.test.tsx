// import { render, screen } from '@testing-library/react';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
// import '@testing-library/jest-dom/extend-expect';
// import ProductCard from './product-card';
// import { makeFakeGuitar } from '../../../utils/mocks';
// import { Provider } from 'react-redux';
// import { configureMockStore } from '@jedmao/redux-mock-store';

// const mockStore = configureMockStore();

// const state = {
//   guitars: new Array(27).fill('').map(makeFakeGuitar),
//   sortedGuitars: new Array(27).fill('').map(makeFakeGuitar),
//   filterState: {
//     type: [],
//     strings: [],
//     price: [],
//     currentStrings: [],
//     pagination: [0, 9],
//   },
//   comments: [],
// };
// describe('Component: ProductCard', () => {
//   test('should render correctly', () => {
//     const history = createMemoryHistory();
//     render(
//       <Provider store={mockStore(state)}>
//         <Router history={history}>
//           <ProductCard guitar={makeFakeGuitar()} />,
//         </Router>,
//       </Provider>,
//     );
//     const imgElement = screen.getByText(/Рейтинг:/i);
//     const linkElement = screen.getByRole('link', { name: /Купить/i });

//     expect(imgElement).toBeInTheDocument();
//     expect(linkElement).toBeInTheDocument();
//   });
// });

export {

};
