import React from "react";
import "./Paginator.css";

const Paginator = ({ currentPage, finalPage, next, prev }) => {
  return (
    <div className="divPaginator">
      <button disabled={currentPage === 1} onClick={(e) => prev()}> Anterior </button>
      <p className="currentPage">
        Página {currentPage} de {finalPage}
      </p>
      <button disabled={currentPage === finalPage} onClick={(e) => next()}>
        Siguiente
      </button>
    </div>
  );
};

export default Paginator;