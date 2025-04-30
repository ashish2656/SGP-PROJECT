import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQurey } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [qurey, setQurey] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const searchJobHandler = () => {
    dispatch(setSearchQurey(qurey));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="">Dream Jobs</span>
        </h1>

        <p className="text-gray-200 max-w-2xl mx-auto">
          Discover thousands of job opportunities from top companies and employers. 
          Start your career journey today.
        </p>

        <div className="flex w-full max-w-2xl mx-auto">
          <div className="flex w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg items-center gap-4 px-4">
            <input
              onChange={(e) => setQurey(e.target.value)}
              type="text"
              placeholder="Find your dream jobs"
              className="outline-none border-none w-full bg-transparent text-white placeholder:text-gray-300 py-3"
            />
            <Button
              onClick={searchJobHandler}
              className="bg-primary hover:bg-primary/90 text-white rounded-lg"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
