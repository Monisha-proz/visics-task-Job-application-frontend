import { useEffect, useState } from "react";
import { getCall } from "../../services/APICall";
import Cared from "../UI/Card/Card";
import { count } from "../../utlis/Count";
import { useNavigate } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa";


export default function Dashboard() {
    const navigate =useNavigate()
  const [userList, setUserList] = useState([]);
  const [counts, setCount] = useState(null); // Initialize to null or an empty object

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const { response, result } = await getCall("get");
    console.log("Response:", response, "Result:", result);

    setUserList(result);
    
    const list =await count(result); // Get the counts
    setCount(list); // Set the counts to state
  };

  useEffect(() => {
    console.log("Counts updated:", counts); // Log updated counts
  }, [counts]); // Trigger this whenever `counts` changes

  return (
    <div className="mt-3">
      {/* Check if counts exist */}

      <h2 className="my-3 text-center text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
      {counts && (
        <div className="flex gap-2 justify-between px-2 ">
          <Cared count={counts.applied} label="Applied" className="border-indigo-500" icon={<FaLightbulb />
}/>
          <Cared count={counts.interviewing} label="Interviewing" className="border-yellow-400" />
          <Cared count={counts.accepted} label="Accepted" className="border-green-400" />
          <Cared count={counts.rejected} label="Rejected" className="border-red-400" />
        </div>
      )}

      <div className="text-end my-2">

                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>{navigate('/job-list')}}>Go to User list</button>
      </div>
                </div>
  );
}
