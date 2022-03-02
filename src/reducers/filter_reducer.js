/** @format */

import { LOAD_PRODUCTS, SET_LISTVIEW, SET_GRIDVIEW, UPDATE_SORT, SORT_PRODUCTS, UPDATE_FILTERS, FILTER_PRODUCTS, CLEAR_FILTERS } from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price).sort((a, b) => b - a)[0];
    let minPrice = action.payload.map((product) => product.price).sort((a, b) => a - b)[0];
    //console.log(maxPrice, minPrice);

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, min_price: minPrice, price: maxPrice },
    };
    // we spread action.payload here, to get COPY of the original array and to NOT ALTER IT
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (sort === 'name-a') {
      tempProducts = filtered_products.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === 'name-z') {
      tempProducts = filtered_products.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
