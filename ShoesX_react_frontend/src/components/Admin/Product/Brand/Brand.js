import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function Brand() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');

  const handleData = async () => {

    try {
      const url = `${process.env.REACT_APP_URL}/get-brand`;

      const response = await axios.get(url);
      console.log(response.data, 'get res');

      if (response?.data?.status === true) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    handleData();
  }, []);

  // delete brand 
  const handleDelete = async (id) => {
    try {
      const url = `${process.env.REACT_APP_URL}/delete-brand/${id}`

      const response = await axios.delete(url);
      toast.success(response.data);

      if (response.status === 200) {
        handleData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // filter data
  const filterBrand = data?.brand?.filter((item) => {
    const matchSearch = item.brand.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "" || String(item.status) === statusFilter;

    const matchBrand = brandFilter === "" || item.brand === brandFilter;

    return matchSearch && matchStatus && matchBrand;
  })

  return (
    <>
      <div className='product-head'>
        <h3>Brand</h3>
        <button className='btn' id='add-category-btn' onClick={() => navigate('/add-brand')}>Add Brand</button>
      </div>
      <div className='product-body body-bg'>
        {/* Static Filter Section */}
        <div className='row'>
          <div className="col-lg-3 col-md-6 mt-md-0">
            <div className='input-div'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="16" y1="16" x2="22" y2="22" />
              </svg>
              <input
                placeholder="Search Brand"
                type="text"
                className="form-control"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-md-0 mt-3">
            <select className="form-select" onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6 mt-lg-0 mt-md-3 mt-3">
            <select className="form-select" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
              <option value="">All Brands</option>
              {
                data?.brand?.map((item) => (
                  <option key={item._id} value={item.brand}>{item.brand}</option>
                ))
              }
            </select>
          </div>
        </div>

        <div className='product-table table-responsive-xxl'>
          <table className="table align-middle">
            <thead>
              <tr className="text-center">
                <th>Index</th>
                <th>Image</th>
                <th>Brand Name</th>
                <th>Category</th>
                <th>StatusFlag</th>
                <th>Date</th>
                <th>
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>

              {
                filterBrand && filterBrand.length > 0 ? (
                  filterBrand?.map((item, index) => (
                    <tr className="text-center" key={index}>
                      <td>{index + 1}</td>
                      <td><img src={`${process.env.REACT_APP_IMAGE}${item.image}`} alt="brand" style={{ width: "35px" }} /></td>
                      <td>{item.brand}</td>
                      <td>{item.categories && item.categories.length > 0
                        ? item.categories.map(cat => cat.category).join(', ')
                        : "None"}</td>
                      <td>
                        <div className="form-check form-switch d-flex justify-content-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked={item.status === 1}
                          />
                        </div>
                      </td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-3">
                          <i
                            className="fa-solid fa-pen pointer"
                            style={{ color: "#00A1FF", cursor: "pointer" }}
                            onClick={() => navigate('/edit-brand', { state: item })}
                            title="Edit Brand"
                          ></i>
                          <i
                            className="fa-solid fa-trash text-danger"
                            style={{ cursor: "pointer" }}
                            title="Delete Brand"
                            onClick={() => handleDelete(item._id)}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">No Data Found</td>
                  </tr>
                )
              }

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
