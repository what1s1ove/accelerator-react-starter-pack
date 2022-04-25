import React from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CartList from '../cart-list/cart-list';

function CartScreen():JSX.Element {
  return (
    <>
      <h1 className="title title--bigger page-content__title">Корзина</h1>
      <Breadcrumbs />
      <div className="cart">
        <CartList />
      </div>
    </>
  )
}

export default CartScreen;
