// components/Jobs.jsx
import React from "react"
import Navbar from "./shared/Navbar"
import FilterCard from "./FillterCard"
import Job from "./job"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
// 1️⃣ Import the selector (not the action)
import { selectFilteredJobs } from "@/redux/jobSlice"

export default function Jobs() {
  // 2️⃣ Use the selector in useSelector
  const filteredJobs = useSelector(selectFilteredJobs)

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="px-4 py-12 mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-[280px]">
            <FilterCard />
          </div>

          <div className="flex-1">
            {filteredJobs.length === 0 ? (
              <div className="p-6 bg-gray-700 border border-gray-600 rounded-xl">
                <p className="text-lg text-gray-300">
                  No jobs found matching your criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
