import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const PostJob = () => {
    const [selectedOption, setSelectedOption] = useState([]);
    const { register, reset, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    // Watch and update skills from CreatableSelect
    const onSkillsChange = (selected) => {
        setSelectedOption(selected);
        setValue("skills", selected.map(option => option.value)); // Update form value
    };

    const onSubmit = (data) => {
        data.skills = selectedOption
        fetch("http://localhost:3000/post-job", {
            method:"POST",
            headers: {'content-type' : 'application/json'}
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result)
            if(result.acknowledged === true){
                alert("Jobs Posted Successfully")
            }
            reset()
        })
    };

    const options = [
        { value: "JavaScript", label: "JavaScript" },
        { value: "C++", label: "C++" },
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "React", label: "React" },
        { value: "Next.js", label: "Next.js" },
        { value: "Node", label: "Node" },
        { value: "MongoDB", label: "MongoDB" },
    ];

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* First Row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Title</label>
                            <input
                                type="text"
                                defaultValue="Full-Stack Developer"
                                {...register("jobTitle", { required: "Job Title is required" })}
                                className="create-job-input"
                            />
                            {errors.jobTitle && <span className="text-red-500 text-sm">{errors.jobTitle.message}</span>}
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Company Name</label>
                            <input
                                type="text"
                                placeholder="LeapFrog"
                                {...register("companyName", { required: "Company Name is required" })}
                                className="create-job-input"
                            />
                            {errors.companyName && <span className="text-red-500 text-sm">{errors.companyName.message}</span>}
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Minimum Salary</label>
                            <input
                                type="text"
                                placeholder="Rs.10000"
                                {...register("minPrice", { required: "Minimum Salary is required" })}
                                className="create-job-input"
                            />
                            {errors.minPrice && <span className="text-red-500 text-sm">{errors.minPrice.message}</span>}
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Maximum Salary</label>
                            <input
                                type="text"
                                placeholder="Rs.200000"
                                {...register("maxPrice", { required: "Maximum Salary is required" })}
                                className="create-job-input"
                            />
                            {errors.maxPrice && <span className="text-red-500 text-sm">{errors.maxPrice.message}</span>}
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Salary Type</label>
                            <select {...register("salaryType")} className="create-job-input">
                                <option value="">Choose Salary</option>
                                <option value="Daily">Daily</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Location</label>
                            <input
                                type="text"
                                placeholder="Kathmandu"
                                {...register("jobLocation")}
                                className="create-job-input"
                            />
                        </div>
                    </div>

                    {/* Fourth Row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Posting Date</label>
                            <input
                                type="date"
                                {...register("postingDate")}
                                className="create-job-input"
                            />
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Experience Level</label>
                            <select {...register("experienceLevel")} className="create-job-input">
                                <option value="">Select Experience</option>
                                <option value="NoExperience">No Experience</option>
                                <option value="Internship">Internship</option>
                                <option value="WorkRemotely">Work Remotely</option>
                            </select>
                        </div>
                    </div>

                    {/* Skills & Requirements */}
                    <div>
                        <label className="block mb-2 text-lg">Skills & Requirements</label>
                        <CreatableSelect
                            value={selectedOption}
                            onChange={onSkillsChange}
                            options={options}
                            isMulti
                            className="create-job-input py-4"
                        />
                    </div>

                    {/*6th*/}
                    <div className="create-job-flex">
                    <div className="lg:w-1/2 w-full">
    <label className="block mb-2 text-lg">Company Logo</label>
    <input
        type="url"
        placeholder="Paste Logo URL: https://example.com/logo.png"
        {...register("companyLogo", {
            required: "Company Logo URL is required",
            pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|gif))$/,
                message: "Please enter a valid image URL (e.g., .png, .jpg)"
            }
        })}
        className="create-job-input"
    />
    {errors.companyLogo && (
        <span className="text-red-500 text-sm">{errors.companyLogo.message}</span>
    )}
</div>

                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg"> Employment Type</label>
                            <select {...register("employmentType")} className="create-job-input">
                                <option value="">Select Job Type</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                        </div>
                    </div>

                    {/*7th*/}
                    <div className="w-full">
                    <label className="block mb-2 text-lg">Job Description</label>
                    <textarea className="w-full pl-3 py-1.5 focus:outline-none"
                    rows={6}
                    placeholder="Job Description"
                    
                    {...register("description")}></textarea>
                    </div>

                    {/*8th*/}
                    <div className="w-full">
                    <label className="block mb-2 text-lg">Posted By:</label>
                    <input
                                type="email"
                                placeholder="Enter your Email"
                                {...register("postedBy")}
                                className="create-job-input"
                            />
                    </div>



                    {/* Submit Button */}
                    <div className="mt-5">
                        <input
                            type="submit"
                            value="Post Job"
                            className="bg-orange-600 font-semibold text-white py-2 px-4 rounded cursor-pointer"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
