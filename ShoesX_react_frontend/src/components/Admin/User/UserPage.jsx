import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Assets/scss/product.css';

function UserPage() {
  const navigate = useNavigate();
  // Static mock data for users
  const staticUsers = [
    {
      id: 1,
      name: "John Doe",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      statusFlag: 1,
      createAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Jane Smith",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      statusFlag: 0,
      createAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: "Bob Johnson",
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@example.com",
      statusFlag: 1,
      createAt: new Date().toISOString(),
    },
  ];
  const [data, setData] = useState(staticUsers);
  const [updateData, setUpdateData] = useState(false);
  const [selectItems, setSelectItems] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const modalRef = useRef(null);

  const toastConfig = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };

  const filteredData = data.filter(item => {
    const term = searchTerm.toLowerCase();

    const name = item.name ? item.name.toLowerCase() : "";
    const firstName = item.firstName ? item.firstName.toLowerCase() : "";
    const lastName = item.lastName ? item.lastName.toLowerCase() : "";
    const email = item.email ? item.email.toLowerCase() : "";
    const createdAt = item.createAt ? new Date(item.createAt).toLocaleString().toLowerCase() : "";

    const matchesSearch = (
      name.includes(term) ||
      firstName.includes(term) ||
      lastName.includes(term) ||
      email.includes(term) ||
      createdAt.includes(term)
    );

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "true" && item.statusFlag === 1) ||
      (statusFilter === "false" && item.statusFlag === 0);

    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const paginate = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  // Static status toggle
  const handleStatusToggle = (id, isChecked) => {
    const newStatus = isChecked ? 1 : 0;
    setData(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, statusFlag: newStatus } : cat
      )
    );
    toast.success("Status updated successfully!", toastConfig);
  };

  return (
    <>
      <div className='product-head'>
        <h3>User</h3>
      </div>
      <div className='product-body body-bg'>
        <div className='row'>
          <div className='col-lg-3 col-md-6 mt-md-0'>
            <div className='input-div'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="16" y1="16" x2="22" y2="22" />
              </svg>
              <input placeholder="Search User" value={searchTerm} className='form-control' type="text" onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }} />
            </div>
          </div>
          <div className='col-lg-3 col-md-6 mt-md-0 mt-3'>
            <select
              className="form-select"
              aria-label="Default select example"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className='col-lg-3 col-md-6 mt-lg-0 mt-md-3 mt-3'>
            <select className="form-select" aria-label="Default select example">
              <option defaultValue>Category</option>
              <option value="1">Brand</option>
            </select>
          </div>
          <div className='col-lg-3 col-md-6 mt-lg-0 mt-md-3 mt-3'>
            <select className="form-select" aria-label="Default select example">
              <option defaultValue>Brand</option>
              <option value="1">Nike</option>
              <option value="2">Adidas</option>
            </select>
          </div>
        </div>
        <>
          {data.length === 0 ? (
            <p>No users available</p>
          ) : (
            <>
              <div className='product-table table-responsive-xxl'>
                <table className="table align-middle">
                  <thead>
                    <tr className="text-center">
                      <th>Index</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((user, index) => (
                        <tr key={user.id || index} className="text-center">
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td className="">
                            <div className="form-check form-switch d-flex justify-content-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked={user.statusFlag === 1}
                                onChange={(e) => handleStatusToggle(user.id, e.target.checked)}
                                disabled={isUpdatingStatus}
                              />
                            </div>
                          </td>
                          <td>{new Date(user.createAt).toLocaleDateString() || 'N/A'}</td>
                          <td>
                            <div className="d-flex justify-content-center gap-3">
                              <i
                                className="fa-solid fa-eye"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate('user-details', { state: user })}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="View User Details"
                              ></i>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className='text-center'>
                        <td colSpan="6">
                          {searchTerm ? 'No matching results found' : 'No users available'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Pagination controls */}
              {filteredData.length > 0 && (
                <div className="mt-3">
                  <div className="showing-entries">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
                    {searchTerm && ` (filtered from ${data.length} total entries)`}
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                    {/* Right-aligned rows per page dropdown (with nowrap) */}
                    <div className="d-flex align-items-center text-nowrap" style={{ width: "200px" }}>
                      <span className="me-2">Rows per page:</span>
                      <select
                        className="form-select form-select-sm"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        style={{ width: "65px" }}
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                      </select>
                    </div>
                    {/* Centered pagination navigation */}
                    <nav className="d-flex justify-content-center mt-md-0 mt-3">
                      <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button className="page-link shadow-none" onClick={goToPreviousPage}>Previous</button>
                        </li>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          // Logic to show 5 page buttons centered around current page
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                              <button className="page-link shadow-none" onClick={() => paginate(pageNum)}>
                                {pageNum}
                              </button>
                            </li>
                          );
                        })}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button className="page-link shadow-none" onClick={goToNextPage}>Next</button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </>
          )}
        </>
        <ToastContainer />
      </div>
    </>
  );
}

export default UserPage;
