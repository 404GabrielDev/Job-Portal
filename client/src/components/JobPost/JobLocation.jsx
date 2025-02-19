import React from "react";
import useGlobalContext from "../../context/UseContext";
import './jobLocation.css'


const JobLocation = () => {
  const { setLocation, location } = useGlobalContext();

  const handleLocationChange = (e) => {
    const { name, value } = e.target;

    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container-allLocation">
      <h3>Job Location</h3>
      <div className="container-countryCity">
        <div className="input-CountryCity">
          <label htmlFor="country">País</label>
          <input
            type="text"
            id="country"
            name="country"
            value={location.country}
            onChange={handleLocationChange}
            placeholder="insira a localidade do País"
          />
        </div>

        <div className="input-CountryCity">
          <label htmlFor="city">Cidade</label>
          <input
            type="text"
            id="city"
            name="city"
            value={location.city}
            onChange={handleLocationChange}
            placeholder="insira uma cidade"
          />
        </div>
      </div>

      <div>
        <div className="input-address">
          <label htmlFor="country">Endereço</label>
          <input
            type="text"
            id="address"
            name="address"
            value={location.address}
            onChange={handleLocationChange}
            placeholder="insira um endereço"
          />
        </div>
      </div>
    </div>
  );
};

export default JobLocation;
