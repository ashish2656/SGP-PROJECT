import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user?.role === 'recruiter'){
      navigate('/admin/companies');
    } 
  },[]);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')",
              filter: "brightness(0.2)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <main className="container mx-auto px-4 pt-16">
            <div className="text-white">
              <HeroSection/>
            </div>
            
            {/* Main Content Section */}
            <div className="py-16">
              {/* Category Section */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Browse by Category</h2>
                <div className="bg-background/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-8">
                  <CategoryCarousel/>
                </div>
              </div>

              {/* Latest Jobs Section */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Latest Job Opportunities</h2>
                <div className="bg-background/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-8">
                  <LatestJobs/>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer/> 
    </div>
  )
}

export default Home