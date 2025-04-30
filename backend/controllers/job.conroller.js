import {Job} from "../models/job.model.js"

// Admin post karega job

export const postJob = async (  req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, position, companyId, experience } = req.body;
        const userId = req.id;

        // Validate required fields
        if (!title || !description || !requirements || !salary || !location || !experience || !jobType || !position || !companyId) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        // Validate numeric fields
        if (isNaN(position) || position < 0) {
            return res.status(400).json({ message: "Position must be a valid non-negative number.", success: false });
        }
        if (isNaN(salary) || salary < 0) {
            return res.status(400).json({ message: "Salary must be a valid non-negative number.", success: false });
        }
        if (isNaN(experience) || experience < 0) {
            return res.status(400).json({ message: "Experience must be a valid non-negative number.", success: false });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: Number(experience),
            position: Number(position),
            company: companyId,
            created_by: userId,
        });

        return res.status(201).json({
            message: "Job posted successfully",
            job,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Student ke liye

export const getAllJobs = async (req,res)=>{
    try {
        const keyword = req.query.keyword || "";

        // Build the query based on the keyword
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } }
            ]
        };

        // If the keyword is a salary range, handle it separately
        if (keyword.includes('L')) {
            const [min, max] = keyword.split('-').map(s => parseInt(s));
            if (!isNaN(min) && !isNaN(max)) {
                query.$or.push({
                    salary: { $gte: min, $lte: max }
                });
            } else if (!isNaN(min)) {
                query.$or.push({
                    salary: { $gte: min }
                });
            }
        }

        const jobs = await Job.find(query)
            .populate({
                path: 'company'
            })
            .sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// Student ke liye
export const getJobById = async (req,res)=>{
    try {
        
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });

        if(!job){
            return res.status(404).json({
                message : "Job not found.",
                success:false
            })
        }

        return res.status(200).json({job,success:true})

    } catch (error) {
        console.log(error);
    }
}

// Admin kitne job create kara abhi tak
export const getAdminJobs = async (req,res)=>{
    try {
        
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:"company",
            createdAt:-1
        })

        if(!jobs){
            return res.status(404).json({
                message:"Jobs is not found",
                success:false
            })
        }
            // console.log("helllll");
            
        return res.status(200).json({jobs,success:true});

    } catch (error) {
        console.log(error);
        
    }
}