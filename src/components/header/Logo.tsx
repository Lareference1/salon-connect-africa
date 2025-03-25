
import { Link } from 'react-router-dom';
import { Scissors } from "lucide-react";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center group">
      <div className="mr-2 p-1.5 bg-salon-primary rounded-md flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
        <Scissors className="h-4 w-4 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-display text-salon-primary tracking-wide leading-tight">SalonConnect</span>
        <span className="text-salon-accent1 text-xs -mt-1 font-medium">Africa</span>
      </div>
    </Link>
  );
};

export default Logo;
