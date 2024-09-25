import { useEffect, useState } from "react"
import { getCall } from "../../services/APICall"
import { useForm } from "react-hook-form";
import Input from "../UI/FormInput/Input/Input";
import { postCall } from "../../services/APICall";
import { useNavigate } from "react-router-dom";

export default function EditForm({id,onClose,reloadData}){
    const navigate =useNavigate()
    const [initialData, setIntialData]= useState()
    const statusList = [
        { id: 1, value: "applied", label: "Applied" },
        { id: 2, value: "interviewing", label: "Interviewing" },
        { id: 3, value: "accepted", label: "Accepted" },
        { id: 4, value: "rejected", label: "Rejected" }
    ];
    useEffect(()=>{
        if(id){
            getUserData()

        }
    },[])
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        const payload = JSON.stringify(data);
        const { response, result } = await postCall(`update/${id}`, payload);
        if (!response.ok) {
            console.log("error");
        } else {

            onClose(); // Close the popup after successful submission
            // Optionally navigate or perform other actions
            reloadData()
            navigate('/job-list');
        }
        console.log(response, result);
    };

    const getUserData = async () => {
        const { response, result } = await getCall(`/get/${id}`);
    
        if (response.ok) {
            // Format the date from result
            if (result.date) { // Assuming 'date' is the field name in your API response
                const formattedDate = new Date(result.date).toISOString().split("T")[0]; // Format to YYYY-MM-DD
                result.date = formattedDate; // Replace the original date with formatted date
            }
            reset(result); // Populate form with fetched data
        } else {
            console.error("Error fetching user data:", result);
        }
    };
    
    return<>
     <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg mx-auto p-6 shadow-md bg-white rounded-md"
        >
            <Input
                label="Job Title"
                name="title"
                register={register}
                validation={{
                    required: "Job Title is required",
                    minLength: {
                        value: 3,
                        message: "Job Title must be at least 3 characters long",
                    },
                }}
                errors={errors}
            />

            <Input
                label="Company Name"
                name="company_name"
                register={register}
                validation={{
                    required: "Company Name is required",
                    minLength: {
                        value: 2,
                        message: "Company Name must be at least 2 characters long",
                    },
                }}
                errors={errors}
            />

            <Input
                label="Date Applied"
                name="date"
                type="date"
                register={register}
                validation={{ required: "Date is required" }}
                errors={errors}
            />

            <Input
                label="Status"
                name="status"
                type="select"
                optionList={statusList}
                register={register}
                validation={{
                    required: "Status is required",
                    pattern: {
                        value: /^(applied|interviewing|accepted|rejected)$/,
                        message:
                            "Status must be one of applied, interviewed, accepted, rejected",
                    },
                }}
                errors={errors}
            />

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Submit
            </button>
        </form>

    
    </>
}