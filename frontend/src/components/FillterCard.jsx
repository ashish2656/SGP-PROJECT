import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '@/redux/jobSlice'
import { MapPin, Briefcase, DollarSign } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Input } from './ui/input'

export default function FilterCard() {
  const dispatch = useDispatch()
  const allJobs = useSelector((state) => state.job.allJobs)
  const activeFilters = useSelector((state) => state.job.filters)

  const [filterOptions, setFilterOptions] = useState({
    locations: [],
    industries: [],
    salaries: [],
  })
  const [searchInputs, setSearchInputs] = useState({
    location: '',
    industry: '',
  })

  // Build the dropdown options whenever jobs change
  useEffect(() => {
    const locations = [
      ...new Set(allJobs.map((j) => j.location).filter(Boolean)),
    ]

    const industries = [
      ...new Set(
        allJobs.map((job) => {
          const title = job.title.toLowerCase()
          if (title.includes('frontend')) return 'Frontend Developer'
          if (title.includes('backend')) return 'Backend Developer'
          if (title.includes('full stack')) return 'Full Stack Developer'
          if (title.includes('data')) return 'Data Science'
          return job.title.split(' ')[0]
        })
      ),
    ].filter(Boolean)

    const salaries = allJobs
      .map((j) => j.salary)
      .filter(Boolean)
      .sort((a, b) => a - b)

    if (salaries.length) {
      const min = salaries[0]
      const max = salaries[salaries.length - 1]
      setFilterOptions({
        locations,
        industries,
        salaries: [
          `${min}-${min + 5}`,
          `${min + 5}-${min + 10}`,
          `${min + 10}-${min + 15}`,
          `${min + 15}+`,
        ],
      })
    } else {
      setFilterOptions({ locations: [], industries: [], salaries: [] })
    }
  }, [allJobs])

  const handleFilterChange = (field, value) => {
    // field should match slice key: location, industry, salaryRange
    const key = field === 'salary' ? 'salaryRange' : field
    dispatch(
      setFilters({
        [key]: value === 'all' ? 'all' : value,
      })
    )
  }

  const handleSearchInput = (type, value) => {
    setSearchInputs((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const filteredLocations = filterOptions.locations.filter((loc) =>
    loc.toLowerCase().includes(searchInputs.location.toLowerCase())
  )
  const filteredIndustries = filterOptions.industries.filter((ind) =>
    ind.toLowerCase().includes(searchInputs.industry.toLowerCase())
  )

  return (
    <div className="w-full p-6 border shadow-xl bg-gray-800/50 rounded-xl border-gray-700/50 backdrop-blur-sm">
      <h1 className="mb-6 text-2xl font-bold text-white">Filter Jobs</h1>

      <div className="space-y-4">
        {/* Location */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-400" />
            <label className="font-semibold text-white">Location</label>
          </div>
          <Select
            value={activeFilters.location}
            onValueChange={(v) => handleFilterChange('location', v)}
          >
            <SelectTrigger className="w-full text-gray-200 border-gray-600 bg-gray-700/50">
              <SelectValue placeholder="Search or select location" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <div className="p-2">
                <Input
                  type="text"
                  placeholder="Search location..."
                  value={searchInputs.location}
                  onChange={(e) =>
                    handleSearchInput('location', e.target.value)
                  }
                  className="w-full text-gray-200 border-gray-600 bg-gray-700/50"
                />
              </div>
              <SelectItem value="all" className="text-white hover:bg-gray-700">
                All Locations
              </SelectItem>
              {filteredLocations.map((loc, i) => (
                <SelectItem
                  key={i}
                  value={loc}
                  className="text-white hover:bg-gray-700"
                >
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            <label className="font-semibold text-white">Industry</label>
          </div>
          <Select
            value={activeFilters.industry}
            onValueChange={(v) => handleFilterChange('industry', v)}
          >
            <SelectTrigger className="w-full text-gray-200 border-gray-600 bg-gray-700/50">
              <SelectValue placeholder="Search or select industry" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <div className="p-2">
                <Input
                  type="text"
                  placeholder="Search industry..."
                  value={searchInputs.industry}
                  onChange={(e) =>
                    handleSearchInput('industry', e.target.value)
                  }
                  className="w-full text-gray-200 border-gray-600 bg-gray-700/50"
                />
              </div>
              <SelectItem value="all" className="text-white hover:bg-gray-700">
                All Industries
              </SelectItem>
              {filteredIndustries.map((ind, i) => (
                <SelectItem
                  key={i}
                  value={ind}
                  className="text-white hover:bg-gray-700"
                >
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Salary */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-400" />
            <label className="font-semibold text-white">Salary Range</label>
          </div>
          <Select
            value={activeFilters.salaryRange}
            onValueChange={(v) => handleFilterChange('salary', v)}
          >
            <SelectTrigger className="w-full text-gray-200 border-gray-600 bg-gray-700/50">
              <SelectValue placeholder="Select salary range" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all" className="text-white hover:bg-gray-700">
                All Salaries
              </SelectItem>
              {filterOptions.salaries.map((sal, i) => (
                <SelectItem
                  key={i}
                  value={sal}
                  className="text-white hover:bg-gray-700"
                >
                  {sal}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
