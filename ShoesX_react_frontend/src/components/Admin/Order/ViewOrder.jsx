import React, { useEffect, useState } from 'react'
import ProductDetails from '../../Assets/Images/product-details-1.webp'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useLocation } from 'react-router-dom';


function ViewOrder() {

    const { state } = useLocation();
    const url = process.env.REACT_APP_URL;
    const image = process.env.REACT_APP_IMAGE;
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        if (state?.selectedVariant?.images?.length > 0 && !selectedImage) {
            setSelectedImage(`${image}/public/images/${state.selectedVariant.images[0]}`);
        }
    }, [state, selectedImage]);


    return (
        <>
            <div className='product-head'>
                <h3>Order Detail</h3>
            </div>
            <div className='view-product-body body-bg'>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <img src={selectedImage} alt="product" className="img-fluid mb-3" />
                        <div className='img-child'>
                            <Swiper
                                slidesPerView={5}
                                spaceBetween={20}
                                className="mySwiper"
                                breakpoints={
                                    {
                                        1024: {
                                            slidesPerView: 4,
                                            spaceBetween: 15,
                                        },
                                        768: {
                                            slidesPerView: 4,
                                            spaceBetween: 10,
                                        },
                                        425: {
                                            slidesPerView: 3,
                                            spaceBetween: 10,
                                        },
                                        375: {
                                            slidesPerView: 2,
                                            spaceBetween: 10,
                                        },
                                        320: {
                                            slidesPerView: 2,
                                            spaceBetween: 10,
                                        },
                                    }
                                }
                            >
                                {state.selectedVariant.images.map((imgSrc, i) => {
                                    const fullImgUrl = `${image}/public/images/${imgSrc}`;
                                    return (
                                        <SwiperSlide key={i} className="swiper-img">
                                            <img
                                                src={fullImgUrl}
                                                alt={`Thumbnail ${i}`}
                                                className={`img-fluid ${selectedImage === fullImgUrl ? 'selected-image' : ''}`}
                                                onClick={() => setSelectedImage(fullImgUrl)}
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className='stocks'>
                            <span>{state.selectedVariant.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                            <p>electronics</p>
                        </div>
                        <h4>{state.product.name}</h4>
                        <p>{state.product.description}</p>
                        <div className='sku-content'>
                            {/* <p><del>$350</del></p> */}
                            <h6>Price:</h6>
                            <p>₹{state?.bid?.bidAmount}</p>
                        </div>
                        {/* <div className='review'>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-rating-star" class="h-5 w-5 text-warning" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-rating-star" class="h-5 w-5 text-warning" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-rating-star" class="h-5 w-5 text-warning" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-rating-star" class="h-5 w-5 text-warning" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg stroke="#e2e4e7" fill="#e2e4e7" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-rating-star" class="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <p>(236 reviews)</p>
                        </div> */}
                        <div className='color-content'>
                            <h6>Colors:</h6>
                            {/* <span></span> */}
                            <span style={{ backgroundColor: state.selectedVariant.colorName }}></span>
                        </div>
                        <div className='size-content'>
                            <h6>Size:</h6>
                            <p>{state.selectedVariant.size}</p>
                        </div>
                        <div className='sku-content'>
                            <h6>SKU:</h6>
                            <p>{state.product.sku}</p>
                        </div>
                        <div className='sku-content'>
                            <h6>Material:</h6>
                            <p>{state.product.material}</p>
                        </div>
                        <div className='sku-content'>
                            <h6>Quantity:</h6>
                            <p>{state.quantity}</p>
                        </div>
                        <div className='sku-content'>
                            <h6>Total Price:</h6>
                            <p>₹{state.totalPrice}</p>
                        </div>
                        <div className='sku-content'>
                            <h6>Order Status:</h6>
                            <p>{state.orderStatus}</p>
                        </div>
                        <div className='sku-content'>
                            <h6>Date:</h6>
                            <p>{new Date(state.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='view-product-body body-bg'>
                <div className='review-description'>
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">User Details</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Payment Details</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className='sku-content'>
                                        <h6>Id:</h6>
                                        <p>{state.user?.id}</p>
                                    </div>
                                    <div className='sku-content'>
                                        <h6>First Name:</h6>
                                        <p>{state.user.firstName}</p>
                                    </div>
                                    <div className='sku-content'>
                                        <h6>Last Name:</h6>
                                        <p>{state.user.lastName}</p>
                                    </div>
                                    <div className='sku-content'>
                                        <h6>Email:</h6>
                                        <p>{state.user.email}</p>
                                    </div>
                                    <div className='sku-content'>
                                        <h6>Phone:</h6>
                                        <p>{state.user.phone}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='sku-content'>
                                        <h6>Address Line 1:</h6>
                                        <p>{state.address.addressLine1}</p>
                                    </div>
                                    <div className='sku-content'>
                                        <h6>Address Line 2:</h6>
                                        <p>{state.address.addressLine2}</p>
                                    </div>
                                    <div className='sku-content'>
                                        <h6>City:</h6>
                                        <p>{state.address.city}</p>
                                    </div>
                                    <div className='sku-content'>
                                        <h6>Postal Code:</h6>
                                        <p>{state.address.postalCode}</p>
                                    </div>
                                    <div className='sku-content'>
                                        <h6>State:</h6>
                                        <p>{state.address.state}</p>
                                    </div>
                                    <div className='sku-content'>
                                        <h6>Country:</h6>
                                        <p>{state.address.country}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                            {/* <div className='review-content'>
                                <div className='review-inner-content'>
                                    <h6>Average Rating</h6>
                                    <h3>4/5</h3>
                                    <div className='d-flex align-items-center gap-2'>
                                        <svg stroke="#e2e4e7" fill="#e2e4e7" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-rating-star" class="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <svg stroke="#e2e4e7" fill="#e2e4e7" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-rating-star" class="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <svg stroke="#e2e4e7" fill="#e2e4e7" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-rating-star" class="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <svg stroke="#e2e4e7" fill="#e2e4e7" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-rating-star" class="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <svg stroke="#e2e4e7" fill="#e2e4e7" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-rating-star" class="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    </div>
                                </div>
                                <div className='review-progress'>
                                    <div className='d-flex align-items-center justify-content-between gap-3'>
                                        <p>1 Stars</p>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <h5>(485)</h5>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between gap-3'>
                                        <p>2 Stars</p>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <h5>(215)</h5>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between gap-3'>
                                        <p>3 Stars</p>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <h5>(110)</h5>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between gap-3'>
                                        <p>4 Stars</p>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <h5>(620)</h5>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between gap-3'>
                                        <p>5 Stars</p>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <h5>(160)</h5>
                                    </div>
                                </div>
                            </div> */}
                            <div className='sku-content'>
                                <h6>Payment Method:</h6>
                                <p>{state.paymentMethod}</p>
                            </div>
                            <div className='sku-content'>
                                <h6>Payment Status:</h6>
                                <p>{state.paymentStatus}</p>
                            </div>
                            <div className='sku-content'>
                                <h6>Total Price:</h6>
                                <p>{state.totalPrice}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewOrder