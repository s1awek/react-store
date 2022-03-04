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
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const {
      all_products,
      filters: { text, company, category, color, price, shipping },
    } = state;
    let tempProducts = [...all_products];

    if (text.length) {
      tempProducts = tempProducts.filter((item) => {
        return item.name.toLowerCase().startsWith(text.toLowerCase().trim());
      });
    }

    if (category !== 'all') {
      tempProducts = tempProducts.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }
    if (company !== 'all') {
      tempProducts = tempProducts.filter((item) => item.company.toLowerCase() === company.toLowerCase());
    }
    if (color !== 'all') {
      tempProducts = tempProducts.filter((item) => item.colors.some((some) => some === color));
    }
    if (shipping) {
      tempProducts = tempProducts.filter((item) => item.shipping);
    }

    tempProducts = tempProducts.filter((item) => item.price <= price);

    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    action.payload.price = state.filters.max_price;
    return { ...state, filters: { ...state.filters, ...action.payload } };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
