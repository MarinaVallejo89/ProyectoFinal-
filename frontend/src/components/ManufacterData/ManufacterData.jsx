import React from "react";
import "./ManufacterData.css";

const ManufacterData = ({ data }) => {
  return (
    <div>
      <h1>Informacion del fabricante</h1>
      <p>{data}</p>
    </div>
  );
};

export default ManufacterData;
