import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Order() {
    // Static mock data for orders
    const staticOrders = [
        {
            orderId: "ORD-001",
            userId: "USER-001",
            product: {
                sku: "NKE-AM-001",
                name: "Nike Air Max"
            },
            bid: {
                bidAmount: 299.99
            },
            selectedVariant: {
                colorName: "#FF0000",
                sizeName: "10"
            },
            quantity: 1,
            orderStatus: "Processing"
        },
        {
            orderId: "ORD-002",
            userId: "USER-002",
            product: {
                sku: "ADS-SS-001",
                name: "Adidas Superstar"
            },
            bid: {
                bidAmount: 199.99
            },
            selectedVariant: {
                colorName: "#0000FF",
                sizeName: "9"
            },
            quantity: 2,
            orderStatus: "Delivered"
        },
        {
            orderId: "ORD-003",
            userId: "USER-003",
            product: {
                sku: "PMA-RN-001",
                name: "Puma Runner"
            },
            bid: {
                bidAmount: 149.99
            },
            selectedVariant: {
                colorName: "#00FF00",
                sizeName: "11"
            },
            quantity: 1,
            orderStatus: "Shipped"
        }
    ];
    const [data, setData] = useState(staticOrders);
    const navigate = useNavigate();

    // Static permissions - always allow all actions
    const permissions = {
        orders: ["edit", "view"],
        0: ["*"]
    };

    // Static status change
    const handleStatusChange = (orderId, newStatus) => {
        setData(prevData =>
            prevData.map(order =>
                order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
            )
        );
        toast.success("Order status updated");
    };

    // Function to get color name from hex
    const getColorName = (hexCode) => {
        const colorMap = {
            "#FF0000": "Red",
            "#0000FF": "Blue",
            "#00FF00": "Green",
            "#FFFF00": "Yellow",
            "#FF00FF": "Magenta",
            "#00FFFF": "Cyan",
            "#000000": "Black",
            "#FFFFFF": "White"
        };
        return colorMap[hexCode] || hexCode;
    };

    return (
        <>
            <div className='product-head'>
                <h3>Order</h3>
            </div>
            <div className='product-body body-bg'>
                <div className='row'>
                    <div className='col-lg-3 col-md-6 mt-md-0'>
                        <div className='input-div'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="16" y1="16" x2="22" y2="22" />
                            </svg>
                            <input placeholder="Search Order" className='form-control' type="text" />
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 mt-md-0 mt-3'>
                        <select className="form-select" aria-label="Default select example">
                            <option defaultValue>All Status</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                    <div className='col-lg-3 col-md-6 mt-lg-0 mt-md-3 mt-3'>
                        <select className="form-select" aria-label="Default select example">
                            <option defaultValue>All Categories</option>
                            <option value="1">Sneakers</option>
                            <option value="2">Sports</option>
                        </select>
                    </div>
                    <div className='col-lg-3 col-md-6 mt-lg-0 mt-md-3 mt-3'>
                        <select className="form-select" aria-label="Default select example">
                            <option defaultValue>All Brands</option>
                            <option value="1">Nike</option>
                            <option value="2">Adidas</option>
                        </select>
                    </div>
                </div>
                <div className='product-table table-responsive-xxl'>
                    <table className="table align-middle">
                        <thead className=''>
                            <tr className='text-center'>
                                <th>Order Id</th>
                                <th>User Id</th>
                                <th>SKU</th>
                                <th>Price</th>
                                <th className='text-start'>Color</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Order Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr className="text-center" key={index}>
                                        <td>{item.orderId}</td>
                                        <td>{item.userId}</td>
                                        <td>{item?.product?.sku}</td>
                                        <td>${item?.bid?.bidAmount}</td>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <span
                                                    style={{
                                                        backgroundColor: item.selectedVariant?.colorName,
                                                        borderRadius: "50%",
                                                        display: "inline-block",
                                                        width: "20px",
                                                        height: "20px",
                                                        marginRight: "8px"
                                                    }}
                                                ></span>
                                                <span>{getColorName(item.selectedVariant?.colorName)}</span>
                                            </div>
                                        </td>
                                        <td>{item.selectedVariant?.sizeName}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            <select
                                                className="form-select form-select-sm"
                                                value={item.orderStatus}
                                                onChange={(e) => handleStatusChange(item.orderId, e.target.value)}
                                            >
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className="d-flex justify-content-center gap-3">
                                                <i
                                                    className="fa-solid fa-eye"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => navigate('view-order', { state: item })}
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="View Order Details"
                                                ></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="text-center" colSpan={9}>No orders available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Order;