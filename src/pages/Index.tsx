
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if we already have a user in localStorage
    const userJson = localStorage.getItem("currentUser");
    
    if (userJson) {
      // User exists, go to home
      navigate("/home");
    } else {
      // No user, go to login
      navigate("/login");
    }
  }, [navigate]);
  
  return <div>Redirecting...</div>;
};

export default Index;
