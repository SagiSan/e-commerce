import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectShopCollection = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForOverview = createSelector(
  [selectShopCollection],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam =>
  createSelector([selectShopCollection], collections =>
    collections ? collections[collectionUrlParam] : null
  );
