import "./Container.css";
import axios from "axios";
import Table from "../table/Table";
import Formulario from "../form/Formulario";
import Paginator from "../Paginator/Paginator";
import React, { useState, useEffect } from "react";
import ManufacterData from "../ManufacterData/ManufacterData";

const Container = ({ title }) => {
  
  const [currentProducts, setProducts] = useState([]);
  const [currentFilters, setFilters] = useState({ color: '', price: '', brand: ''});

  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(1);

  const [manufacterAndProduct, setManufacterAndProduct] = useState([]);

  useEffect(() => {
    axios.get(getProductsURL()).then((res) => {
      const { page, totalPages, docs } = res.data;
      setCurrentPage(page);
      setFinalPage(totalPages);
      setProducts(docs);
    });
  }, [currentFilters, currentPage]);

  const getProductsURL = () => {
    let url = "http://localhost:5000/products";
    let URL_PRODUCTS = []
    if(currentFilters.brand !== ''
    || currentFilters.color !== ''
    || currentFilters.price !== '' ){
      url = url + '?';
    }
    if (currentFilters?.brand !== '') {
      URL_PRODUCTS.push(`brand=${currentFilters.brand || ""}`);
    }
    if (currentFilters?.color !== '') {
      URL_PRODUCTS.push(`color=${currentFilters.color || ""}`);
    }
    if (currentFilters?.price !== '') {
      URL_PRODUCTS.push(`price=${currentFilters.price || 0}`);
    }
    return url+URL_PRODUCTS.join('&');
  };

  const showManufacterData = (id) => {
    axios.get(getManufactersURL(id)).then((res) => {
      const { manufacter } = res.data.products;
      setManufacterAndProduct(manufacter);
    });
  };

  const getManufactersURL = (id) => {
    let URL_MANUFACTERS = "http://127.0.0.1:5000/products/manufacter";
    if (id) {
      URL_MANUFACTERS += `?id=${id}`;
    }
    return URL_MANUFACTERS;
  };

  return (
    <div className="container">
      <Formulario title={title} setFilters={setFilters} />
      {currentProducts?.length && (
        <>
          <Table
            data={currentProducts}
            showManufacterData={showManufacterData}
          />
          <Paginator
            currentPage={currentPage}
            finalPage={finalPage}
            next={() => {
              setCurrentPage((prev) => (prev === finalPage ? prev : ++prev));
            }}
            prev={() => {
              setCurrentPage((prev) => (prev === 1 ? prev : --prev));
            }}
          />
        </>
      )}
      {manufacterAndProduct?.length && (
        <ManufacterData data={manufacterAndProduct}></ManufacterData>
      )}
      {!currentProducts?.length && (
        <div className="contNoResults">
          {currentProducts && currentProducts.map(row=>
            <>No existen resultados</>  
          )}
        </div>
      )}
    </div>
  );

};

export default Container;
