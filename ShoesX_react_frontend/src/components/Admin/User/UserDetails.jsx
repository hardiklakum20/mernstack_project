import { Link, useLocation, useNavigate } from "react-router-dom"
import home from '../../Assets/Images/Home.svg';
import '../../Assets/scss/userdetail.css';
import userBg from '../../Assets/Images/userBg.jpg';
import profieImg from '../../Assets/Images/profile-img.webp';
import { useState } from "react";

export function UserDetails() {
    // Static mock data for user details
    const staticAddresses = [
        {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "+1234567890",
            addressLine1: "123 Main Street",
            addressLine2: "Apt 4B",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "USA"
        }
    ];
    const staticOrders = [
        {
            id: 1,
            orderNumber: "ORD-001",
            status: "Delivered",
            total: 299.99,
            date: new Date().toISOString()
        },
        {
            id: 2,
            orderNumber: "ORD-002",
            status: "Processing",
            total: 149.99,
            date: new Date().toISOString()
        }
    ];
    const staticBids = [
        {
            id: 1,
            productName: "Nike Air Max",
            bidAmount: 150.00,
            status: "Active",
            date: new Date().toISOString()
        },
        {
            id: 2,
            productName: "Adidas Superstar",
            bidAmount: 200.00,
            status: "Won",
            date: new Date().toISOString()
        }
    ];
    const [address] = useState({ addresses: staticAddresses });
    const [order] = useState(staticOrders);
    const [bids] = useState(staticBids);
    const navigate = useNavigate();
    const { state } = useLocation();

    return (
        <>
            <div className='product-head'>
                <h3>User Detail</h3>
                <Link className="d-flex">
                    <img src={home} className="me-2" alt="home"></img> <p className="slash mb-0">/</p>
                    <button className='btn ms-2' id='add-category-btn'>User Details</button>
                </Link>
            </div>

            <div className="user-section">
                <img src={userBg} className="user-bg" alt="user background"></img>

                <div className="row">
                    <div className="col-4 d-flex justify-content-center align-items-center flex-column">
                        <div>
                            <label htmlFor="email-id" className="email-label">Email:</label>
                            <span className="email-id"> {state?.email || "john.doe@example.com"}</span>
                        </div>
                        <div>
                            <label htmlFor="phone" className="phone-label">Phone:</label>
                            <span className="phone">{state?.phone || "+1234567890"}</span>
                        </div>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center flex-column">
                        <div className="user-img">
                            <img src={profieImg} alt="profile"></img>
                        </div>
                        <p className="username">{state?.firstName || "John"} {state?.lastName || "Doe"}</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center">
                        <div className="user-icons">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                            </svg>
                        </div>
                        <div className="user-icons1">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M9 3.6c5 6 7 10.5 7.5 16.2"></path><path d="M6.4 19c3.5 -3.5 6 -6.5 14.5 -6.4"></path><path d="M3.1 10.75c5 0 9.814 -.38 15.314 -5"></path>
                            </svg>
                        </div>
                        <div className="user-icons2">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z"></path><path d="M10 9l5 3l-5 3z"></path>
                            </svg>
                        </div>
                        <button className="add-story">Add to Story</button>
                    </div>
                </div>

                <div className="profile-tab d-flex justify-content-end">
                    <ul className="nav nav-tabs" id="userTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="Nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                                <i className="fa-regular fa-user"></i>    Personal Details
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="Nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                                <i className="fa-solid fa-clock-rotate-left"></i>  Order History
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="Nav-link" id="bill-tab" data-bs-toggle="tab" data-bs-target="#bill-tab-pane" type="button" role="tab" aria-controls="bill-tab-pane" aria-selected="false">
                                <i className="fa-solid fa-credit-card"></i> Bidding Info
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="user-tab-sec">
                <div className="tab-content" id="userTabContent">
                    <div className="tab-pane fade address-details show active p-3" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                        {address?.addresses?.map((addr, index) => (
                            <div className="card" key={index}>
                                <div className="card-header">
                                    Address Details
                                </div>
                                <div className="card-body">
                                    <div>
                                        <label className="personal-label">First Name :</label>
                                        <span className="personal-input"> {addr.firstName}</span>
                                    </div>
                                    <div>
                                        <label className="personal-label">Last Name :</label>
                                        <span className="personal-input"> {addr.lastName}</span>
                                    </div>
                                    <div>
                                        <label className="personal-label">Email :</label>
                                        <span className="personal-input"> {addr.email}</span>
                                    </div>
                                    <div>
                                        <label className="personal-label">Phone :</label>
                                        <span className="personal-input"> {addr.phone}</span>
                                    </div>
                                    <div>
                                        <label className="personal-label">Address Line 1 :</label>
                                        <span className="personal-input"> {addr.addressLine1}</span>
                                    </div>
                                    <div>
                                        <label className="personal-label">Address Line 2 :</label>
                                        <span className="personal-input"> {addr.addressLine2}</span>
                                    </div>
                                    <div>
                                        <label className="personal-label">City :</label>
                                        <span className="personal-input"> {addr.city}</span>
                                    </div>
                                    <div>
                                        <label className="personal-label">State :</label>
                                        <span className="personal-input"> {addr.state}</span>
                                    </div>
                                    <div>
                                        <label className="personal-label">Zip Code :</label>
                                        <span className="personal-input"> {addr.zipCode}</span>
                                    </div>
                                    <div>
                                        <label className="personal-label">Country :</label>
                                        <span className="personal-input"> {addr.country}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="tab-pane fade p-3" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                        <div className="card">
                            <div className="card-header">
                                Order History
                            </div>
                            <div className="card-body">
                                {order && order.length > 0 ? (
                                    order.map((ord, index) => (
                                        <div key={index} className="mb-3 p-3 border rounded">
                                            <div className="d-flex justify-content-between">
                                                <span><strong>Order:</strong> {ord.orderNumber}</span>
                                                <span><strong>Status:</strong> {ord.status}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span><strong>Total:</strong> ${ord.total}</span>
                                                <span><strong>Date:</strong> {new Date(ord.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No orders found</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade p-3" id="bill-tab-pane" role="tabpanel" aria-labelledby="bill-tab" tabIndex="0">
                        <div className="card">
                            <div className="card-header">
                                Bidding Information
                            </div>
                            <div className="card-body">
                                {bids && bids.length > 0 ? (
                                    bids.map((bid, index) => (
                                        <div key={index} className="mb-3 p-3 border rounded">
                                            <div className="d-flex justify-content-between">
                                                <span><strong>Product:</strong> {bid.productName}</span>
                                                <span><strong>Status:</strong> {bid.status}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span><strong>Bid Amount:</strong> ${bid.bidAmount}</span>
                                                <span><strong>Date:</strong> {new Date(bid.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No bids found</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}