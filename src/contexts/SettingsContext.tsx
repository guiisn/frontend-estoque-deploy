import { createContext, useContext, useState } from 'react';

import { api } from '../config/api';

interface SettingsContextData {
  fetchProduct: (
    barcode: string,
    name: string,
    price: string,
    validate: string,
    qtd: string
  ) => {};
  sellProduct: (barcode: string, qtd: string) => {};
  fetchBarcodeScanned: (barcode: string) => {};
  barcodeScanned: string;
  fetchTotalValue: () => {};
  findProductByBarcode: (barcode: string) => {};
  product: string[];
  listAllProducts: () => {};
  products: string[];
  findProductOfQuery: (query: string) => {};
  findProductsCloseToExpiration: () => {};
  productsToExpiration: string[];
  totalValue: string;
}

const SettingsContext = createContext<SettingsContextData>(
  {} as SettingsContextData
);

export function SettingsProvider({ children }: any) {
  const [barcodeScanned, setBarcodeScanned] = useState('');
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsToExpiration, setProductsToExpiration] = useState([]);

  const [totalValue, setTotalValue] = useState('');

  async function listAllProducts() {
    await api
      .get('/product')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => `❌ ${error}`);
  }

  async function fetchTotalValue() {
    const response = await api
      .get('/products/value')
      .then((value) => setTotalValue(value.data))
      .catch((error) => `❌ ${error}`);
  }

  async function fetchProduct(
    barcode: string,
    name: string,
    price: string,
    validate: string,
    qtd: string
  ) {
    const dataToSend = {
      barcode,
      name,
      price,
      validate_product: validate,
      qtd,
    };

    await api
      .post('/create-product', dataToSend)
      .then(() => {
        alert('✔ Produto cadastrado com sucesso!');
        setBarcodeScanned('');
      })
      .catch((error) => alert(`❌ ${error}`));
  }

  async function fetchBarcodeScanned(barcode: string) {
    setBarcodeScanned(barcode);
  }

  async function sellProduct(barcode: string, qtd: string) {
    await api
      .put(`/product/sell/${barcode}`, { qtd })
      .then(() => {
        alert('✔ Produto vendido com sucesso!');
        setBarcodeScanned('');
      })
      .catch((error) => `❌ ${error}`);
  }

  async function findProductByBarcode(barcode: string) {
    await api
      .get(`/product/${barcode}`)
      .then((product) => {
        const { data } = product;

        setProduct(data);
      })
      .catch((error) => `❌ ${error}`);
  }

  async function findProductOfQuery(query: string) {
    await api
      .get(`/products/${query}`)
      .then((product) => {
        setProducts(product.data);
      })
      .catch((error) => `❌ ${error}`);
  }

  async function findProductsCloseToExpiration() {
    await api
      .get('/products/expiration')
      .then((products) => {
        setProductsToExpiration(products.data);
      })
      .catch((error) => `❌ ${error}`);
  }

  return (
    <SettingsContext.Provider
      value={{
        productsToExpiration,
        totalValue,
        fetchProduct,
        sellProduct,
        fetchBarcodeScanned,
        barcodeScanned,
        fetchTotalValue,
        findProductByBarcode,
        product,
        listAllProducts,
        products,
        findProductOfQuery,
        findProductsCloseToExpiration,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  return context;
}
