import "./Container.css";
import axios from "axios";
import Table from "../table/Table";
import Formulario from "../form/Formulario";
import Paginator from "../Paginator/Paginator";
import React, { useState, useEffect } from "react";
import ManufacterData from "../ManufacterData/ManufacterData";

const Container = ({ title }) => {
  const [currentProducts, setProducts] = useState([]);
  const [currentFilters, setFilters] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(1);

  const [manufacterAndProduct, setManufacterAndProduct] = useState([]);

  useEffect(() => {
    axios.get(getProductsURL()).then((res) => {
      const { page, totalPages, products } = res.data;
      setCurrentPage(page);
      setFinalPage(totalPages);
      setProducts(products);
    });
  }, [currentFilters, currentPage]);

  const getProductsURL = () => {
    let URL_PRODUCTS = "http://127.0.0.1:5000/products/search";
    if (currentFilters) {
      const { name, relevance, price } = currentFilters;
      console.log(name, relevance, price);
      URL_PRODUCTS += `?name=${name || ""}&relevancia=${relevance || ""}&price=${
        price || ""
      }`;
    } else {
      URL_PRODUCTS += "?name=&relevancia=&price=";
    }
    URL_PRODUCTS += `&page=${currentPage ? currentPage : 1}`;
    console.log(URL_PRODUCTS);
    return URL_PRODUCTS;
  };

  const showManufacterData = (id) => {
    axios.get(getManufactersURL(id)).then((res) => {
      const { manufacter } = res.data.products;
      console.log(manufacter.name, manufacter.cif, manufacter.address);
      setManufacterAndProduct(manufacter);
      console.log(manufacterAndProduct);
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
          <p>No existen resultados</p>
        </div>
      )}
    </div>
  );
};

export default Container;
