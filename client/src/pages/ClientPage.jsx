import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "../css/ClientPage.css";
import { AuthContext } from "../contexts/AuthContext";
import ClientNavbar from "../components/ClientNavbar";
import MenuItem from "../components/MenuItem";

const ClientPage = () => {
  const { loggedinUser, setLoggedinUser } = useContext(AuthContext);
  const { restaurantid } = useParams();
  
  const [dishesArr, setDishesArr] = useState([]);

  const navigate = useNavigate();

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/providers/restaurant/${restaurantid}`,
        { withCredentials: true }
      );
      
      // Set the loggedinUser to response.name
      if (response.data.name) {
        setLoggedinUser({ ...loggedinUser, name: response.data.name });
      }

      if (Array.isArray(response.data.allOverlappingDishesAndAllergens)) {
        setDishesArr(response.data.allOverlappingDishesAndAllergens);
      }
    } catch (err) {
      console.error("Error Details:", err);
    }
  };

  useEffect(() => {
    console.log('ey', dishesArr);
  }, [dishesArr])

  useEffect(() => {
    if (!loggedinUser) {
      navigate("/login");
    }
    getAllData();
  }, [loggedinUser, navigate]);

  return (
    <>
      <ClientNavbar />

      <main>
        <p className="restaurant-line">
          Welcome to <span className="restaurant-name">Golden Apple</span>
        </p>

        <hr />
        <div className="explanation">
          {/* Only display message when loggedinUser.name is available */}
          {`These are the dishes you should avoid, based on your personal allergens:`}
        </div>

        {Array.isArray(dishesArr) && dishesArr.map((dishData, i) => (
          <MenuItem dishName={dishData[0]} allergensArray={dishData[1]} key={i} />
        ))}
        
        <hr />
      </main>
    </>
  );
};

export default ClientPage;
