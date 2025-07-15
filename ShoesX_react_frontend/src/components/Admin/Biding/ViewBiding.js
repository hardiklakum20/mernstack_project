import { useEffect, useState } from 'react';
import '../../Assets/scss/ProductVariant.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import namer from 'color-namer';
import { toast } from 'react-toastify';

export function ViewBiding() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [data, setData] = useState([]);
    const [disabledColorIndexes, setDisabledColorIndexes] = useState([]);
    const [rejectedUserColorIndexKeys, setRejectedUserColorIndexKeys] = useState([]);
    const url = process.env.REACT_APP_URL;
    const image = process.env.REACT_APP_IMAGE;
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    const [permissions, setPermissions] = useState("");

    useEffect(() => {
        const fetchPermission = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    toast.error("Unauthorized: No token found");
                    return;
                }
                const decodedToken = JSON.parse(atob(token.split(".")[1]));

                const { data } = await axios.get(
                    `${url}/admin/${decodedToken.id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (data?.success === 1) {
                    setPermissions(data?.admin?.permissions);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchPermission();
    }, []);

    useEffect(() => {
        const fetchVariants = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${url}/bids/admin/${state}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const bids = response.data.data;

                // Create lists to disable buttons
                const processingColorIndexes = new Set();
                const rejectUserColorIndexes = new Set();

                bids.forEach(bid => {
                    if (bid.status === 'processing') {
                        processingColorIndexes.add(bid.colorIdIndex);
                    } else if (bid.status === 'reject') {
                        rejectUserColorIndexes.add(`${bid.userId}-${bid.colorIdIndex}`);
                    }
                });

                setData(bids);
                setDisabledColorIndexes([...processingColorIndexes]);
                setRejectedUserColorIndexKeys([...rejectUserColorIndexes]);

            } catch (err) {
                console.error("Error fetching variants:", err);
            }
        };

        fetchVariants();
    }, []);

    const handleUpdate = async (productId, newStatus, colorIdIndex, userId) => {
        try {
            const tokenFromStorage = localStorage.getItem("token");
            if (!tokenFromStorage) {
                toast.error("Unauthorized: No token found");
                return;
            }

            const decodedToken = JSON.parse(atob(tokenFromStorage.split('.')[1]));
            const updateUser = decodedToken.id;

            const response = await axios.put(
                `${url}/bids/update/admin/${productId}`,
                { status: newStatus, updateUser },
                {
                    headers: {
                        'Authorization': `Bearer ${tokenFromStorage}`
                    }
                }
            );

            console.log(response.data, "Status updated");

            if (newStatus === 'processing') {
                setDisabledColorIndexes(prev => [...new Set([...prev, colorIdIndex])]);
            } else if (newStatus === 'reject') {
                const key = `${userId}-${colorIdIndex}`;
                setRejectedUserColorIndexKeys(prev => [...new Set([...prev, key])]);
            }
            setData(prevData =>
                prevData.map(bid =>
                    bid.id === productId ? { ...bid, status: newStatus } : bid
                )
            );

        } catch (error) {
            console.error('Update Error:', error.response?.data?.message || error.message);
        }
    };

    // Filtering data based on search term
    const filteredData = Array.isArray(data)
        ? data.filter(item => {
            if (!searchTerm) return true;

            const term = searchTerm.toLowerCase();

            return (
                (item.id && item.id.toString().includes(term)) ||
                (item.userId && item.userId.toString().includes(term)) ||
                (item.bidAmount && item.bidAmount.toString().includes(term)) ||
                (item.variants?.[0]?.size && item.variants[0].size.toString().includes(term)) ||
                (item.createdAt && new Date(item.createdAt).toLocaleString().toLowerCase().includes(term))
            );
        })
        : [];

    // Pagination logic
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const sortedFilteredData = [...filteredData].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    const currentItems = sortedFilteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle rows per page change
    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    // Previous page
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Next page
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <div className='product-head'>
                <h3>Biding</h3>
                <button className='btn btn-closes' onClick={() => navigate('/product')}>Cancel</button>
            </div>

            <div className='product-body body-bg'>
                <div className='d-flex align-items-center justify-content-between flex-md-nowrap flex-wrap gap-3 gap-md-4'>
                    <div className='input-div'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="16" y1="16" x2="22" y2="22" />
                        </svg>
                        <input
                            placeholder="Search Product"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    {/* <div className='d-flex gap-md-3 gap-2 w-100'>
                        <select className="form-select">
                            <option selected>Active</option>
                            <option value="1">Inactive</option>
                        </select>
                        <select className="form-select">
                            <option selected>Category</option>
                            <option value="1">Brand</option>
                        </select>
                        <select className="form-select">
                            <option selected>Category</option>
                            <option value="1">Brand</option>
                        </select>
                    </div> */}
                </div>

                <div className='product-table table-responsive-xxl'>
                    <table className="table align-middle">
                        <thead>
                            <tr className='text-center'>
                                <th>Id</th>
                                <th>User Id</th>
                                <th>Base Price</th>
                                <th>Bid Price</th>
                                <th className='text-start'>Color</th>
                                <th>Size</th>
                                <th>Date</th>
                                <th>
                                    {(permissions?.bids?.includes("edit") || permissions?.[0]?.includes("*")) && (
                                        <span>Action</span>
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.length > 0 ? (
                                currentItems.map((item, index) => {
                                    const isStatusReject = item.status === 'reject';
                                    const isStatusProcessing = item.status === 'processing';

                                    const isColorIndexDisabled = disabledColorIndexes.includes(item.colorIdIndex);
                                    const isUserRejectedForColor = rejectedUserColorIndexKeys.includes(`${item.userId}-${item.colorIdIndex}`);

                                    const shouldDisableButtons =
                                        isStatusProcessing ||
                                        isColorIndexDisabled ||
                                        isUserRejectedForColor;


                                    return (
                                        <tr key={index} className='text-center'>
                                            <td>{item.id}</td>
                                            <td>{item.userId}</td>
                                            <td>{item?.variants?.[0]?.price || 'N/A'}</td>
                                            <td>{item.bidAmount}</td>
                                            <td>
                                                {item.variants?.[0]?.colorName ? (
                                                    <div className='d-flex align-items-center'>
                                                        <span
                                                            style={{
                                                                backgroundColor: item.variants[0].colorName,
                                                                borderRadius: "50%",
                                                                display: "inline-block",
                                                                width: "20px",
                                                                height: "20px"
                                                            }}
                                                        ></span>
                                                        {(() => {
                                                            const hex = item.variants?.[0]?.colorName;
                                                            const getColorName = (hexCode) => {
                                                                try {
                                                                    const names = namer(hexCode);
                                                                    return (
                                                                        names.ntc?.[0]?.name ||
                                                                        names.basic?.[0]?.name ||
                                                                        names.html?.[0]?.name ||
                                                                        names.pantone?.[0]?.name ||
                                                                        hexCode
                                                                    );
                                                                } catch (err) {
                                                                    console.error("Error converting color:", err);
                                                                    return hexCode;
                                                                }
                                                            };
                                                            return <span>{getColorName(hex)}</span>;
                                                        })()}
                                                    </div>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                            <td>{item?.variants?.[0]?.size || 'N/A'}</td>
                                            <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</td>
                                            <td>
                                                {(permissions?.bids?.includes("edit") || permissions?.[0]?.includes("*")) && (
                                                    <div className='d-flex justify-content-center gap-2'>
                                                        {item.status === 'processing' ? (
                                                            <span className='badge bg-warning text-dark'>Approved</span>
                                                        ) : item.status === 'reject' ? (
                                                            <span className='badge bg-danger'>Rejected</span>
                                                        ) : item.status === 'complete' ? (
                                                            <span className='badge bg-success'>Complete</span>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    className='btn default-btn'
                                                                    type='button'
                                                                    disabled={shouldDisableButtons}
                                                                    onClick={() => handleUpdate(item.id, 'processing', item.colorIdIndex)}
                                                                >
                                                                    Approve
                                                                </button>
                                                                <button
                                                                    className='btn btn-closes'
                                                                    type='button'
                                                                    disabled={shouldDisableButtons}
                                                                    onClick={() => handleUpdate(item.id, 'reject', item.colorIdIndex)}
                                                                >
                                                                    Reject
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="9" className='text-center'>
                                        {searchTerm ? 'No matching results found' : 'No Bidding Available'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {filteredData.length > 0 && (
                    <div className="mt-3">
                        <div className="showing-entries">
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
                            {searchTerm && ` (filtered from ${data.length} total entries)`}
                        </div>

                        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
                            {/* Right-aligned rows per page dropdown */}
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
            </div>
        </>
    );
}