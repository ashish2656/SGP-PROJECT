import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { User2, LogOut, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

function Navbar() {
  const {user} = useSelector(store=>store.auth); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async() =>{
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
      if(res.data.success){
          dispatch(setUser(null));
          navigate("/");
          toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <nav className="w-full bg-background/95 backdrop-blur-md border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Job <span className="text-primary">Portal</span>
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {user && user.role === 'recruiter' ? (
                <>
                  <li>
                    <Link to="/admin/companies" className="nav-link">Companies</Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs" className="nav-link">Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
                  <li>
                    <Link to="/jobs" className="nav-link">Jobs</Link>
                  </li>
                  <li>
                    <Link to="/browse" className="nav-link">Browse</Link>
                  </li>
                </>
              )}
            </ul>

            {!user ? (
              <div className="flex gap-3">
                <Link to="/login">
                  <Button className="btn-primary">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname}
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 glass-card">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="ring-2 ring-primary/20">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname}
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-foreground">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 my-4">
                    {user && user.role === 'student' && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                        <User2 className="w-4 h-4" />
                        <Button variant="ghost" className="p-0 h-auto">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div 
                      onClick={logoutHandler}
                      className="flex w-fit items-center gap-2 cursor-pointer text-destructive hover:text-destructive/80 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
