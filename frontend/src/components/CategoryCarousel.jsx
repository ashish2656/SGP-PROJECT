import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQurey } from "@/redux/jobSlice";

function CategoryCarousel() {
  const categories = [
    { name: "Frontend Developer", query: "frontend" },
    { name: "Backend Developer", query: "backend" },
    { name: "Data Science", query: "data science" },
    { name: "Graphic Designer", query: "graphic designer" },
    { name: "Full Stack Developer", query: "full stack" },
    { name: "UI/UX Designer", query: "ui/ux" },
    { name: "Mobile Developer", query: "mobile" },
    { name: "DevOps Engineer", query: "devops" }
  ];
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const searchJobHandler = (query) => {
    dispatch(setSearchQurey(query));
    navigate("/browse");
  };

  return (
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories.map((category, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <Button 
                  onClick={() => searchJobHandler(category.query)}
                  className="relative w-full h-24 overflow-hidden text-gray-200 transition-all duration-300 border shadow-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700/50 hover:border-blue-500/30 hover:shadow-blue-500/10 hover:text-white rounded-xl hover:scale-105 hover:shadow-xl group"
                >
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:opacity-100" />
                  <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-xs text-gray-400 group-hover:text-gray-300">Click to browse</span>
                  </div>
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-gray-200 bg-gray-900 border-gray-700/50 hover:bg-gray-800 hover:border-blue-500/30"/>
        <CarouselNext className="text-gray-200 bg-gray-900 border-gray-700/50 hover:bg-gray-800 hover:border-blue-500/30" />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
