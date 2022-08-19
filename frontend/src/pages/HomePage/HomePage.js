import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/comments/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setComments(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchComments();
  }, [token]);
  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      {comments &&
        comments.map((comment) => (
          <p key={comment.id}>
            {/* {car.year} {car.model} {car.make} */}
          </p>
        ))}
    </div>
  );
};

export default HomePage;
