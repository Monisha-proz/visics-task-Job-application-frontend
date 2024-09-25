import React, { useState } from "react";
import { formatDate } from "../../../utlis/Date";
import Popup from "../Popup/Popup";
import EditForm from "../../EditForm/EditForm";
import { deleteCall } from "../../../services/APICall";
import { useNavigate } from "react-router-dom";
import { MdFilterAltOff } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const DataTable = ({ data, reloadData }) => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isDeletePopupOpen, setDeleteIsPopupOpen] = useState(false);
    const [editId, setEditId] = useState();
    const [deleteId, setDeleteId] = useState();
    const [selectedStatus, setSelectedStatus] = useState(""); // State for selected status

    const rowsPerPage = 5;

    // Filter data based on search term and selected status
    const filteredData = data.filter((item) => {
        const matchesSearch = item?.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus ? item?.status === selectedStatus : true;
        return matchesSearch && matchesStatus;
    });

    // Get paginated data
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    // Handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const editUser = (id) => {
        setEditId(id);
        setIsPopupOpen(true);
    };
    
    const deleteUser = (id) => {
        setDeleteId(id);
        setDeleteIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setDeleteIsPopupOpen(false);
    };

    const deleteUserCall = async () => {
        await deleteCall(`/delete/${deleteId}`);
        reloadData();
    };

    // Reset Filters Function
    const resetFilters = () => {
        setSearchTerm("");
        setSelectedStatus("");
        setCurrentPage(1); // Reset to the first page after resetting filters
    };

    return (
        <>
            <Popup isOpen={isPopupOpen} onClose={closePopup} title="Edit Job Data">
                <EditForm id={editId} onClose={closePopup} reloadData={reloadData} />
            </Popup>
            <Popup isOpen={isDeletePopupOpen} onClose={closePopup} title="Delete Job Data">
                <>
                    <p>Are you sure you want to delete this job detail?</p>
                    <div className='flex mt-2 justify-end w-full'>
                        <button onClick={closePopup} className="text-gray-900 bg-white border border-gray-300 ...">Cancel</button>
                        <button onClick={deleteUserCall} className="text-white bg-blue-700 ...">Delete</button>
                    </div>
                </>
            </Popup>
            <div className="container mx-auto p-4">
                <div className="flex justify-end gap-2 items-stretch">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by Title"
                            className="p-2 border border-gray-300 rounded-md  mb-4"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    {/* Status Filter */}
                    <div className="mb-4">
                        <select 
                            value={selectedStatus} 
                            onChange={(e) => setSelectedStatus(e.target.value)} 
                            className="p-2 border border-gray-300 rounded-md "
                        >
                            <option value="">All Statuses</option>
                            <option value="applied">Applied</option>
                            <option value="interviewing">Interviewing</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    {/* Reset Filters Button */}
                    <div className="mb-4">
                        <button 
                            onClick={resetFilters} 
                            className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg px-4 py-3"
                        >
                            <MdFilterAltOff />

                        </button>
                    </div>

                </div>

                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-4 py-2">Job Title</th>
                            <th className="px-4 py-2">Company Name</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-2">{item?.title}</td>
                                <td className="px-4 py-2">{item?.company_name}</td>
                                <td className="px-4 py-2">{formatDate(item?.date)}</td>
                                <td className="px-4 py-2">
                                    {item?.status === "applied" && <span className="bg-yellow-100 rounded px-2.5">Applied</span>}
                                    {item?.status === "interviewing" && <span className="bg-pink-100 rounded px-2.5">Interviewing</span>}
                                    {item?.status === "accepted" && <span className="bg-green-100 rounded px-2.5">Accepted</span>}
                                    {item?.status === "rejected" && <span className="bg-red-100 rounded px-2.5">Rejected</span>}
                                </td>
                                <td>
                  <div className="flex gap-1">
                    <FaEdit
                      onClick={()=>editUser(item?.id)}
                      className="cursor-pointer text-fuchsia-800"
                    />
                    <MdDelete onClick={()=>deleteUser(item?.id)} className="cursor-pointer text-red-800" />
                  </div>
                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-4 flex justify-center space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DataTable;
