import { React } from "react";
import { useForm } from "react-hook-form";
import "./Formulario.css";

const Formulario = ({ title, setFilters }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setFilters(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="formulario">
        <div className="contTitulo">
          <h1>{title}</h1>
        </div>
        <label>Selecciona tu vehículo</label>
        <select
          name="select"
          id="selectBrand"
          className="register"
          {...register("name")}
        >
          <option value="">Todos los coches</option>
          <option value="audi">Audi</option>
          <option value="bmw">BMW</option>
          <option value="porsche">Porsche</option>
          <option value="seat">Seat</option>
          <option value="volkswagen">Volkswagen</option>
        </select>

        <br />

        <label>Relevancia</label>
        <select
          name="select"
          id="selectColor"
          className="register"
          {...register("relevance")}
        >
          <option value="">Cualquier relevancia</option>
          <option value="1">1*</option>
          <option value="2">2*</option>
          <option value="3">3*</option>
          <option value="4">4*</option>
          <option value="5">5*</option>
        </select>

        <br />

        <label>Precio máximo</label>
        <input
          type="number"
          name="price"
          id="inputPrice"
          className="register"
          {...register("price")}
        />

        <br />
        <input id="button" type="submit" value="Buscar" />
      </form>
    </>
  );
};

export default Formulario;
