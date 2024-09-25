import { useEffect, useState } from "react";
import { getCall } from "../../services/APICall";
import DataTable from "../UI/Datatable/DataTable";
import Popup from "../UI/Popup/Popup";
import AddForm from "../AddForm/AddForm";
import Card from "../UI/Card/Card"
import { count } from "../../utlis/Count";
import { useNavigate } from "react-router-dom";

export default function JobList() {
    const navigate =useNavigate()
    const [userList, setUserList] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Manage popup state

    const getUserList = async () => {
        const { response, result } = await getCall('get');
        console.log(response, result);
        setUserList(result);
        const lists =count(result);
    };

    useEffect(() => {
        getUserList();
    }, []);

    const closePopup = () => {
        getUserList();
        setIsPopupOpen(false); // Function to close popup
    };

    return (
        <div className="p-2">
            <h3 className="text-center font-bold  text-4xl text-gray-900 dark:text-white mt-3">Job List</h3>
            <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={()=>{navigate('/')}}>Go to Dashboard</button>
            
            <Popup isOpen={isPopupOpen} onClose={closePopup} title="Add New Job Data">
                <AddForm onClose={closePopup} reloadData={getUserList} /> {/* Pass close function as prop */}
            </Popup>
            <div className ='text-end' >

                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>{setIsPopupOpen(true)}}>Add Job</button>
            </div>

            <>
            {userList?.length > 0 &&
                <DataTable data={userList} reloadData={getUserList} />
            }
            {userList?.length == 0 &&
                <p>No Job list Data</p>
            }
            </>
        </div>
    );
}
