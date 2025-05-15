
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center animate-fade-in">
        <h1 className="text-5xl font-bold mb-4 cosmos-gradient inline-block text-transparent bg-clip-text">404</h1>
        <p className="text-xl mb-6">Oops! Page not found</p>
        <Button asChild className="bg-stakekit-purple hover:bg-stakekit-secondary">
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
