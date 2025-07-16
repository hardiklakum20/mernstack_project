import '../../Assets/scss/dashboard.css';
import dash_img from '../../Assets/Images/dash_img.png';
import dash2 from '../../Assets/Images/dash2.svg';
import dash3 from '../../Assets/Images/dash3.svg';
import dash4 from '../../Assets/Images/dash4.svg';
import dash5 from '../../Assets/Images/dash5.svg';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import list from '../../Assets/Images/list.svg'

export function Dashboard() {
    // Static mock data for dashboard    

    const [state] = useState({
        series: [{
            name: "Sales",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        }
    });

    const [barchart] = useState({
        series: [{
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 5,
                    borderRadiusApplication: 'end'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        },
    });

    const donutSeries = [50, 35, 21, 17, 15];

    const donutOptions = {
        chart: {
            type: "donut",
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
                offsetY: 10,
            },
        },
        grid: {
            padding: {
                bottom: -100,
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };
    const [name, setName] = useState('');

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        if (storedName) {
            setName(storedName);
        } else {
            setName('Admin');
        }
    }, []);

    return (
        <div>
            <div className="d-flex flex-wrap flex-lg-nowrap mt-5">
                <div className="dash1 d-flex flex-wrap flex-sm-nowrap justify-content-sm-between">
                    <div className='ps-4 pt-3'>
                        <p className='title'>Welcome {name}</p>
                        <p className='txt'>Check all the statistics</p>
                        <div className='d-flex mt-3'>
                            <div className='dash1-sec-bg'>
                                <p className='txt1'>573</p>
                                <p className='txt2'>Leads</p>
                            </div>
                            <div className='dash2-sec-bg'>
                                <p className='txt1'>87%</p>
                                <p className='txt2'>Conversion</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src={dash_img} className='dash_img' alt="dashboard"></img>
                    </div>
                </div>

                <div className='dash2'>
                    <div className='img-bg'>
                        <img src={dash2} alt="sales"></img>
                    </div>
                    <p className='number'>2358 <span>+23%</span></p>
                    <p className='txt'>Sales</p>
                </div>

                <div className='dash3'>
                    <div className='img-bg'>
                        <img src={dash3} alt="orders"></img>
                    </div>
                    <p className='number'>434 <span>-12%</span></p>
                    <p className='txt'>Orders</p>
                </div>

                <div className='dash4'>
                    <div className='img-bg'>
                        <img src={dash4} alt="revenue"></img>
                    </div>
                    <p className='number'>$2,358 <span>+23%</span></p>
                    <p className='txt'>Revenue</p>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-header">
                            <h5>Sales Overview</h5>
                        </div>
                        <div className="card-body">
                            <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>Revenue Distribution</h5>
                        </div>
                        <div className="card-body">
                            <ReactApexChart options={donutOptions} series={donutSeries} type="donut" height={350} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Monthly Performance</h5>
                        </div>
                        <div className="card-body">
                            <ReactApexChart options={barchart.options} series={barchart.series} type="bar" height={350} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Recent Orders</h5>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#12345</td>
                                            <td>John Doe</td>
                                            <td>$299.99</td>
                                            <td><span className="badge bg-success">Delivered</span></td>
                                        </tr>
                                        <tr>
                                            <td>#12346</td>
                                            <td>Jane Smith</td>
                                            <td>$149.99</td>
                                            <td><span className="badge bg-warning">Processing</span></td>
                                        </tr>
                                        <tr>
                                            <td>#12347</td>
                                            <td>Bob Johnson</td>
                                            <td>$199.99</td>
                                            <td><span className="badge bg-info">Shipped</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Top Products</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                                <img src={list} alt="product" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                                <div>
                                    <h6 className="mb-0">Nike Air Max</h6>
                                    <small className="text-muted">$299.99</small>
                                </div>
                                <span className="ms-auto badge bg-primary">Best Seller</span>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <img src={list} alt="product" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                                <div>
                                    <h6 className="mb-0">Adidas Superstar</h6>
                                    <small className="text-muted">$199.99</small>
                                </div>
                                <span className="ms-auto badge bg-secondary">Popular</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <img src={list} alt="product" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                                <div>
                                    <h6 className="mb-0">Puma Runner</h6>
                                    <small className="text-muted">$149.99</small>
                                </div>
                                <span className="ms-auto badge bg-info">Trending</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}