import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { getHeroByName } from "../../selectors/getHeroByName";
import { HeroCard } from "../hero/HeroCard";
import queryString from 'query-string';

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const [heroes, setHeroes] = useState([]);

  const initialForm = {
    searchText: q
  };
  
  const [ formValues, handleInputChange, reset ] = useForm( initialForm );

  const { searchText } = formValues;
  
  const herosFiltered = useMemo(() => getHeroByName(q), [q])

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${searchText}`);  
  }

  return (
    <>
      <h1>Búsquedas</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />

          <form onSubmit={handleSearch}>
            <input 
              type="text"
              placeholder="Buscar un héroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
            />

            <button 
              className="btn btn-outline-primary mt-5"
              type="submit"
              >
                Buscar...

            </button>
          </form>

        </div>

        <div className="col-7">
          <h4>Resultados</h4>
          <hr />

          {
            (q === '')
              ? <div className="alert alert-info">Buscar un heroe</div>
              : (herosFiltered.length === 0) && <div className="alert alert-danger">No hay resultados {q} </div>
          }

          {
            herosFiltered.map(hero => (
              <HeroCard 
                key={hero.id}
                {...hero}
              />
            ))
          }

        </div>

      </div>
    </>
  );
};