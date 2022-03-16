import Home from './home';
import AddProduct from './addProduct';
import SellProduct from './sellProduct';
import ListAllProducts from './listAllProducts';
import FindProduct from './findProduct';
import ProductsCloseToExpiration from './productsCloseToExpiration';

import BarcodeScanner from './BarcodeScanner';

export const Routes = [
  {
    name: 'Home',
    component: Home,
  },
  {
    name: 'AddProduct',
    component: AddProduct,
  },
  {
    name: 'SellProduct',
    component: SellProduct,
  },
  {
    name: 'Scanner',
    component: BarcodeScanner,
  },
  {
    name: 'ListAll',
    component: ListAllProducts,
  },
  {
    name: 'FindProduct',
    component: FindProduct,
  },
  {
    name: 'CloseToExpiration',
    component: ProductsCloseToExpiration,
  },
];
