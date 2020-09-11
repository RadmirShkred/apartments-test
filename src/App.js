import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import heart from './images/heart.svg';
import heartFill from './images/heart-fill.svg';

function App() {
  const [flats, setFlats] = useState(null);
  //костылёк, но в других реалиях сделал бы по-другому (если иметь автономные стейты, то будет переключаться отдельно) ;)
  const [hearts, setHearts] = useState(true);
  const apiURL = "https://my-json-server.typicode.com/RadmirShkred/apartments-test/db";
  const images = require.context('./images', true);

  const fetchData = async () => {
    const response = await axios.get(apiURL);
    setFlats(response.data.response)
  }

  const heartToggle = () => setHearts(!hearts);


  useEffect(() => {
    window.addEventListener('load', fetchData);
  });

  return (
    <div className="App">
      <h1>Аренда квартир</h1>
      <div className="flats card-deck">
        {flats &&
        flats.map((flat) => {
          console.log(flat.id)
          return (
            <div className="card card__custom" key={flat.id}>
              <img src={images(`./${flat.id}.jpg`)} className="card-img-top" alt="flat"/>
              <div className="card-body">
                <div className="flat__content">
                  <h5 className="card-title">{flat.attributes.title}</h5>
                  <p className="card-text">Количество комнат: {flat.attributes.rooms}</p>
                  <p className="card-text">Город: {flat.attributes.address.city}</p>
                  <p className="card-text"><small className="text-muted">Улица {flat.attributes.address.street},
                    д.{flat.attributes.address.house}, кв.{flat.attributes.address.room}</small></p>
                  <p className="card-text"><small
                    className="text-muted">Площадь: {flat.attributes.area} {flat.attributes.unit}</small></p>
                </div>
                <div className="flat__agent">
                  <p className="card-text">{flat.relationships.type} {flat.relationships.id}</p>
                  <p className="card-text"><small
                    className="text-muted">{flat.relationships.attributes.first_name} {flat.relationships.attributes.middle_name} {flat.relationships.attributes.last_name}</small>
                  </p>
                </div>
                <div className="flat__like" onClick={heartToggle}>
                  {hearts
                    ? <img width="20rem" height="20rem" src={heart} alt=""/>
                    : <img width="20rem" height="20rem" src={heartFill} alt=""/>
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default App;
