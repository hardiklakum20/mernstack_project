import React from "react";
import { useNavigate, Link } from "react-router-dom";
import '../../Assets/scss/product.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Product() {
    const navigate = useNavigate();
    const [productList, setProductList] = useState();
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [brandFilter, setBrandFilter] = useState('');

    const handleProduct = async () => {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_URL}/get-product`;
            const response = await axios.get(url);
            console.log(response.data, 'product list');
            setProductList(response.data.product);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleProduct();
    }, [])

    const handleDelete = async (id) => {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_URL}/delete-product/${id}`
            const response = await axios.delete(url);
            toast.success(response.data);
            if (response.status === 200) {
                handleProduct();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const filterProduct = productList?.filter((item) => {
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());

        const matchStatus = status === "" || String(item.status) === status;

        const matchBrand = brandFilter === "" || item.brand.brand === brandFilter;


        return matchSearch && matchStatus && matchBrand;
    })

    const varientExist = async (productId, navigate) => {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_URL}/get-variant/${productId}`;
            const response = await axios.get(url);

            if (response?.data?.variants.length > 0) {
                toast.warning("Variant already exists for this product.");
            } else {
                navigate('/product/addVariant', { state: productId });
            }
        } catch (error) {
            console.error(error);
            toast.error("Error checking variant.");
        }
    };

    const varientView = async (productId, navigate) => {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_URL}/get-variant/${productId}`;
            const response = await axios.get(url);

            // If no variant found (assume `data.variant` is null or empty)
            if (!response?.data?.variants || response?.data?.variants?.length === 0) {
                toast.warning("No variant found for this product.");
            } else {
                navigate('/product/Variant', { state: productId });
            }
        } catch (error) {
            console.error(error);
            toast.error("Error checking variant.");
        }
    };

    return (
        <>
            <div className='product-head'>
                <h3>Product List</h3>
                <Link to={'/product/add-product'}>
                    <button className='btn' id='add-category-btn'>Add Product</button>
                </Link>
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
                                placeholder="Search Product"
                                type="text"
                                className="form-control"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-md-0 mt-3">
                        <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value=''>All Status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-lg-0 mt-md-3 mt-3">
                        <select className="form-select" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
                            <option value=''>All Brands</option>
                            {
                                productList?.map((item) => (
                                    <option key={item._id} value={item.brand.brand}>{item.brand.brand}</option>
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
                                <th>Product Name</th>
                                <th>Brand</th>
                                <th>StatusFlag</th>
                                <th>Date</th>
                                <th>Varient</th>
                                <th>
                                    <span>Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                filterProduct && filterProduct.length > 0 ? (
                                    filterProduct?.map((product, index) => {
                                        // const brandName = brandList.find((brand) => brand._id === product.brand)?.brand || "Unknown";
                                        return (
                                            <tr className="text-center" key={index}>
                                                <td>{index + 1}</td>
                                                <td>{product.name}</td>
                                                <td>{product?.brand?.brand}</td>
                                                <td>
                                                    <div className="form-check form-switch d-flex justify-content-center">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            role="switch"
                                                            checked={product.status === 1}
                                                        />
                                                    </div>
                                                </td>
                                                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                                        <i
                                                            className="fa-solid fa-plus"
                                                            style={{ cursor: "pointer" }}
                                                            title="Add Variants"
                                                            onClick={() => varientExist(product._id, navigate)}
                                                        ></i>
                                                        <div className="d-flex gap-2 align-items-center py-1 px-2 rounded-3" style={{ backgroundColor: "#00a1ff20" }}>
                                                            <i
                                                                className="fa-solid fa-eye"
                                                                style={{ cursor: "pointer" }}
                                                                title="View Variants"
                                                                onClick={() => varientView(product._id, navigate)}
                                                            ></i>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-center gap-3">
                                                        <i
                                                            className="fa-solid fa-pen pointer"
                                                            style={{ color: "#00A1FF", cursor: "pointer" }}
                                                            onClick={() => navigate('/product/edit-product', { state: product })}
                                                            title="Edit Products"
                                                        ></i>
                                                        <i
                                                            className="fa-solid fa-trash text-danger"
                                                            style={{ cursor: "pointer" }}
                                                            title="Delete Products"
                                                            onClick={() => handleDelete(product._id)}
                                                        ></i>
                                                        <i
                                                            className="fa-solid fa-eye"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => navigate('/product/view-product', { state: product })}
                                                            title="View Products"
                                                        ></i>
                                                        {/* <i className="fa-solid fa-dollar-sign" style={{ cursor: "pointer" }}
                                                            title="view Biding">
                                                        </i> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
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

export default Product;