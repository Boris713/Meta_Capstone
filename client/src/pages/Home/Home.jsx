import { useEffect, useState, useContext } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CardWrapper from "../../components/ui/CardWrapper/CardWrapper";
import { AuthContext } from "../../contexts/authContexts/authContexts";
import { useCity } from "../../contexts/cityContext/cityContext";

const Home = () => {
  const [activityTypes, setActivityTypes] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { city } = useCity();

  useEffect(() => {
    console.log("Effect running", { currentUser, city });
    if (currentUser && currentUser.uid && city && city.cityId) {
      const fetchRecommendations = async () => {
        console.log("Making API call to fetch recommendations");
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_REACT_APP_HOST
            }/itinerary/recommendations?userId=${currentUser.uid}&cityId=${
              city.cityId
            }`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch recommendations");
          }
          const data = await response.json();
          console.log("Recommendations received:", data);
          setActivityTypes(data.slice(0, 3));
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      };
      fetchRecommendations();
    } else {
      console.log("User or City information is incomplete:", {
        currentUser,
        city,
      });
    }
  }, [currentUser, city]);

  return (
    <>
      <div className="container mt-5">
        {activityTypes.map((activity, index) => (
          <CardWrapper key={index} activity={activity} />
        ))}
      </div>
    </>
  );
};

export default Home;
