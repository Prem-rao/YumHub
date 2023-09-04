import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Header from '../components/Header';

import { useParams } from 'react-router-dom';

import Footer from "../components/Footer";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuesry] = useState([]);
  useEffect(()=>{
    fetchRecipes();
  })

  const params = useParams();
  let userId = params.user;

  const fetchRecipes =async () =>{
    axios.get(`http://localhost:4000/api/recipes?title=${searchQuery}`)
    .then((response)=>{
      setRecipes(response.data);
    })
    .catch((error)=>{
      console.error(error);
    });
  };
  return (
    <>
      <Header userId={userId}/>
      <div className="container mt-5">
      <form className="d-flex">
      <input type="search" name="" id="" placeholder="Search for recipes.." className="form-control "
      onChange={(event)=>{
        setSearchQuesry(event.target.value);
      }}/>
      </form>
      <br />
      {

        !recipes?(<p>No recipe found</p>):(
          <>
        {recipes && (
          <div className="row">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="col-md-4">
                <div className="card">
                <img src={recipe.image} alt="image is expired!" class="card-img-top"/>
                  <div className="card-body">
                    <h3 className="card-title">{recipe.title}</h3>
                    <ul className='d-flex flex-row list-unstyled justify-content-between'>
                      <li>
                      <span><img src="./assets/clock.png" alt="" height={'50px'}/></span>
                      <span className='h4'>{recipe.cooking_time}min</span>
                      </li>
                      <li><Link to={{pathname:`/details/${userId}/${recipe._id}`}} className='btn bg-dark text-white'>More info</Link></li>
                    </ul>
                  
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
          </>
        )
      }
      </div>
      <Footer/>
    </>
  )
}

export default Home

