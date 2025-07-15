import { useEffect, useState } from 'react';
import '../../Assets/scss/ProductVariant.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import namer from 'color-namer';
import { toast } from 'react-toastify';

export function Variants() {

    const navigate = useNavigate();
    const [variant, setVariant] = useState([]);
    const { state: productId } = useLocation();

    const handleVarient = async () => {
        try {
            const url = `${process.env.REACT_APP_URL}/get-variant/${productId}`;

            const response = await axios.get(url);
            console.log(response.data, 'varient res');

            if (response?.data?.status === true) {
                setVariant(response.data.variants);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handleVarient();
    }, [])

    const handleDelete = async (id) => {
        try {
            const url = `${process.env.REACT_APP_URL}/delete-variant/${id}`

            const response = await axios.delete(url);
            console.log(response, 'delete res')

            if (response.status === 200) {
                toast.success(response.data.message);
                handleVarient();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to delete variant");
        }
    }
    const capitalizeWords = (str) =>
        str.replace(/\b\w/g, (char) => char.toUpperCase());

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    const filterVariants = variant?.filter((item) => {
        const metaSearch = item.productName.toLowerCase().includes(search.toLowerCase());
        const metaStatus = status === "" || String(item.status) === status;


        return metaSearch && metaStatus;
    })

    return (
        <>
            <div className='product-head'>
                <h3>Variant</h3>
                <button className='btn btn-closes' onClick={() => navigate('/product')}>Cancel</button>
            </div>

            <div className='product-body body-bg'>
                <div className='d-flex align-items-center justify-content-between flex-md-nowrap flex-wrap gap-3 gap-md-4'>
                    <div className='input-div'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="16" y1="16" x2="22" y2="22" />
                        </svg>
                        <input placeholder="Search Product" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className='d-flex gap-md-3 gap-2 w-100'>
                        <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="">All Status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                        {/* <select className="form-select">
                            <option selected>Category</option>
                            <option value="1">Brand</option>
                        </select>
                        <select className="form-select">
                            <option selected>Category</option>
                            <option value="1">Brand</option>
                        </select> */}
                    </div>
                </div>

                <div className='product-table table-responsive-xxl'>
                    <table className="table align-middle">
                        <thead>
                            <tr className='text-center'>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Discount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterVariants && filterVariants.length > 0 ? (
                                    filterVariants?.map((item, productIndex) =>
                                        item.variants.map((v, variantIndex) => {
                                            const name = capitalizeWords(namer(v.color.color).basic[0]?.name || 'Unknown');

                                            return (
                                                <tr className='text-center' key={`${item._id}-${variantIndex}`}>
                                                    <td>{productIndex + 1}</td>
                                                    <td>{item.productName}</td>
                                                    <td>
                                                        <img
                                                            src={`${process.env.REACT_APP_IMAGE}/${v.images?.[0]}`}
                                                            alt='variant'
                                                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                                        />
                                                    </td>
                                                    <td>&#8377; {v.price}</td>
                                                    <td>{name}</td>
                                                    <td>{v.size.size}</td>
                                                    <td>{v.stock}</td>
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
                                                    <td>{v.discount}%</td>
                                                    <td>
                                                        <div className='d-flex justify-content-center gap-3'>
                                                            <i
                                                                className="fa-solid fa-pen pointer"
                                                                style={{ color: "#00A1FF", cursor: "pointer" }}
                                                                onClick={() => navigate("/product/editVariant", { state: item })}
                                                            ></i>
                                                            {/* <i
                                                                className="fa-solid fa-trash text-danger"
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() => handleDelete(item._id, variantIndex)}
                                                            ></i> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="text-center">No Data Found</td>
                                    </tr>
                                )
                            }


                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
}