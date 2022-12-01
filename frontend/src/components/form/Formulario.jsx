import { React, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Formulario.css";

const getManufacters =  "http://localhost:5000/manufacters";
const getProducts = "http://localhost:5000/products";
const getColors = "http://localhost:5000/colors";

const Formulario = ({
  title,
  setFilters
}) => {

  const { register, handleSubmit } = useForm();

  // Valores válidos para los selectores
  const [brands, setBrands] = useState();
  const [colors, setColors] = useState();

  // Valores seleccionados
  const [brand, setBrand] = useState();
  const [color, setColor] = useState();
  const [price, setPrice] = useState();

  const onSubmit = (e) => {
    setFilters(e);
  };

  useEffect(()=>{
    onSubmit({brand: brand, color: color, price: price});
  },[brand, color, price])

  useEffect(() => {

    // Obtener todos los fabricantes existentes
    axios.get(getManufacters).then((res) => {
      // Recorrer estas marcas y juntarlas en un array
      let brands = []
      res.data.map((row)=> brands.push(row))
      // Lo seteo en el estado correspondiente para distintas marcas
      setBrands(brands)
    });

    // Obtener todos los productos que existen para obtener los valores deseados
    axios.get(getColors).then((res) => {
      setColors(res.data)
    });

  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="formulario">
        <div className="contTitulo">
          <h1>{title}</h1>
        </div>
        <label>Selecciona la marca de tu vehículo</label>
        {/*Este es el selector de marcas*/}
        <select
          name="select"
          id="brand"
          className="register"
          onChange={(e)=>setBrand(e.target.value)}//Al cambiar de color en el selector, modificamos el estado dela marca
          {...register("brand")}
        >
          <option disabled>-- Seleccionar --</option>
          {brands && brands.map(row=>
            <option  key={row} value={row}>{row}</option>
          )}
        </select>

        <br />

        <label>Colores</label>
        {/*Este es el selector de colores*/}
        <select          
          name="select"
          id="color"
          className="register"
          onChange={(e)=>setColor(e.target.value)}//Al cambiar de color en el selector, modificamos el estado del color
          {...register("color")}
        >
          <option disabled value=''>-- Seleccionar --</option>
          {colors && colors.map(row=>
            <option key={row} value={row}>{row}</option>
          )}
        </select>

        <br />

        <label>Precio máximo</label>
        <input
          type="number"
          name="price"
          id="price"
          className="register"
          onChange={(e)=>setPrice(e.target.value)}
          {...register("price")}
        />

        <br />
        <input id="button" type="submit" value="Buscar" />
      </form>
    </>
  );
};

export default Formulario;
