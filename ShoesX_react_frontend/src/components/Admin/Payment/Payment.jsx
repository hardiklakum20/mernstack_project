import { useState } from "react";

const transactions = [
    { id: "#001", user: "John Doe", amount: "$120", status: "Completed", method: "Credit Card", date: "2025-03-10" },
    { id: "#002", user: "Jane Smith", amount: "$75", status: "Pending", method: "PayPal", date: "2025-03-12" },
    { id: "#003", user: "Mike Johnson", amount: "$200", status: "Failed", method: "Bank Transfer", date: "2025-03-15" },
];
export default function PaymentPage() {

    const methodOptions = [
        { value: "", label: "All Method" },
        { value: "Credit Card", label: "Credit Card" },
        { value: "PayPal", label: "PayPal" },
        { value: "Bank Transfer", label: "Bank Transfer" }
    ];
    const statusOption = [
        { value: "", label: "All Status" },
        { value: "Completed", label: "Completed" },
        { value: "Pending", label: "Pending" },
        { value: "Failed", label: "Failed" }
    ];

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [method, setMethod] = useState("");
    const [date, setDate] = useState("");

    const filteredTransactions = transactions.filter((t) =>
        (search ? t.user.toLowerCase().includes(search.toLowerCase()) : true) &&
        (status ? t.status === status : true) &&
        (method ? t.method === method : true) &&
        (date ? t.date === date : true)
    );

    return (
        <>
            <div className='product-head'>
                <h3>Payment Details</h3>
                {/* <Link to={'/admin/product/add-product'}><button className='btn' id='add-category-btn'>Add Product</button></Link> */}
            </div>

            <div className='product-body body-bg'>
                <div className="row">
                    <div className="col-lg-3 col-md-6 mt-md-0">
                        <div className='input-div'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="16" y1="16" x2="22" y2="22" />
                            </svg>
                            <input placeholder="Search" className='form-control' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-md-0 mt-3">
                        <select class="form-select shadow-none" aria-label="Default select example" value={status} onChange={(e) => setStatus(e.target.value)}>
                            {
                                statusOption.map((curStatus) => {
                                    return (
                                        <option key={curStatus.value} value={curStatus.value}>
                                            {curStatus.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-lg-0 mt-md-3 mt-3">
                        <select class="form-select shadow-none" aria-label="Default select example" value={method} onChange={(e) => setMethod(e.target.value)}>
                            {
                                methodOptions.map((curMethod) => {
                                    return (
                                        <option key={curMethod.value} value={curMethod.value}>
                                            {curMethod.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-lg-0 mt-md-3 mt-3">
                    <div className='input-div'>
                        <input type="date" className="ps-3 form-control" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    </div>
                </div>
                <div className='product-table table-responsive-xxl'>
                    <table class="table">
                        <thead className=''>
                            <tr>
                                <th>Id</th>
                                <th>User</th>
                                <th>Amout</th>
                                <th>Status</th>
                                <th>Method</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                filteredTransactions.map((index) => {
                                    return (
                                        <tr key={index.id}>
                                            <td>{index.id}</td>
                                            <td>{index.user}</td>
                                            <td>{index.amount}</td>
                                            <td>{index.status}</td>
                                            <td>{index.method}</td>
                                            <td>{index.date}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}
