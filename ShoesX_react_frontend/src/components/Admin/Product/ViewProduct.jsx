import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../../Assets/scss/product.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewProduct() {
    const { state } = useLocation();
    const navigate = useNavigate();

    console.log(state, 'view state');


    // Static mock data for product
    // const staticProductData = {
    //     id: state?.id || 1,
    //     name: state?.name || "Nike Air Max 270",
    //     description: state?.description || "Comfortable running shoes with excellent cushioning",
    //     price: state?.price || 129.99,
    //     discount: state?.discount || 10,
    //     sku: state?.sku || "NIKE-AM270-001",
    //     stock: state?.stock || 50,
    //     material: state?.material || "Mesh and synthetic",
    //     brandId: state?.brandId || 1,
    //     statusFlag: state?.statusFlag || 1,
    //     gender: state?.gender || "unisex",
    //     variants: [
    //         {
    //             id: 1,
    //             color: "Black",
    //             size: "42",
    //             stock: 25,
    //             price: 129.99,
    //             images: [
    //                 "https://via.placeholder.com/400x400/000000/FFFFFF?text=Black+Shoe+1",
    //                 "https://via.placeholder.com/400x400/000000/FFFFFF?text=Black+Shoe+2",
    //                 "https://via.placeholder.com/400x400/000000/FFFFFF?text=Black+Shoe+3"
    //             ]
    //         },
    //         {
    //             id: 2,
    //             color: "White",
    //             size: "42",
    //             stock: 15,
    //             price: 129.99,
    //             images: [
    //                 "https://via.placeholder.com/400x400/FFFFFF/000000?text=White+Shoe+1",
    //                 "https://via.placeholder.com/400x400/FFFFFF/000000?text=White+Shoe+2",
    //                 "https://via.placeholder.com/400x400/FFFFFF/000000?text=White+Shoe+3"
    //             ]
    //         }
    //     ]
    // };

    // // Static mock data for reviews
    // const staticReviewData = [
    //     {
    //         id: 1,
    //         rating: 5,
    //         comment: "Excellent shoes! Very comfortable for running.",
    //         userName: "John Doe",
    //         createdAt: "2024-01-15T10:30:00Z"
    //     },
    //     {
    //         id: 2,
    //         rating: 4,
    //         comment: "Good quality, fits perfectly.",
    //         userName: "Jane Smith",
    //         createdAt: "2024-01-10T14:20:00Z"
    //     }
    // ];

    // const [data, setData] = useState(staticProductData);
    // const [review, setReview] = useState(staticReviewData);
    // const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    // const [selectedImage, setSelectedImage] = useState('');

    // useEffect(() => {
    //     if (data?.variants?.[0]?.images?.[0]) {
    //         setSelectedImage(data.variants[0].images[0]);
    //     }
    // }, [data, selectedVariantIndex]);

    // const ReviewStars = ({ avgRating, totalReviews, avgStars }) => {
    //     const roundedRating = Math.round(avgRating || 4); // Default to 4 stars
    //     const totalStars = 5;

    //     return (
    //         <div className='review flex items-center gap-1'>
    //             {[...Array(totalStars)].map((_, index) => (
    //                 <svg
    //                     key={index}
    //                     stroke="currentColor"
    //                     fill={index < roundedRating ? "currentColor" : "#e2e4e7"}
    //                     strokeWidth="0"
    //                     viewBox="0 0 20 20"
    //                     aria-hidden="true"
    //                     className={`h-5 w-5 ${index < roundedRating ? 'text-warning' : ''}`}
    //                     height="1em"
    //                     width="1em"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //                 </svg>
    //             ))}
    //             {totalReviews && <p>({totalReviews} reviews)</p>}
    //             {avgStars && <p>({avgStars} Star)</p>}
    //         </div>
    //     );
    // };

    // const ReviewCommentStars = ({ avgRating, totalReviews, avgStars }) => {
    //     const roundedRating = Math.round(avgRating || 4); // Default to 4 stars
    //     const totalStars = 5;

    //     return (
    //         <div className='review review-comment-review flex items-center gap-1'>
    //             {[...Array(totalStars)].map((_, index) => (
    //                 <svg
    //                     key={index}
    //                     stroke="currentColor"
    //                     fill={index < roundedRating ? "currentColor" : "#e2e4e7"}
    //                     strokeWidth="0"
    //                     viewBox="0 0 20 20"
    //                     aria-hidden="true"
    //                     className={`h-5 w-5 ${index < roundedRating ? 'text-warning' : ''}`}
    //                     height="1em"
    //                     width="1em"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //                 </svg>
    //             ))}
    //             {totalReviews && <p>({totalReviews} reviews)</p>}
    //             {avgStars && <p>({avgStars} Star)</p>}
    //         </div>
    //     );
    // };

    // const getDaysAgo = (dateString) => {
    //     const createdDate = new Date(dateString);
    //     const now = new Date();
    //     const diffTime = Math.abs(now - createdDate);
    //     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    //     if (diffDays === 0) return 'Today';
    //     if (diffDays === 1) return '1 day ago';
    //     return `${diffDays} days ago`;
    // };

    return (
        <>
            <div className='product-head'>
                <h3>Shop Detail</h3>
                <button className='btn btn-closes' onClick={() => navigate('/product')}>Cancel</button>
            </div>
            <div className='view-product-body body-bg'>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <img alt="product" className='img-fluid' src={`http://localhost:8080${state?.brand?.image}`} />
                        <div className='img-child'>
                            <Swiper
                                slidesPerView={5}
                                spaceBetween={20}
                                className="mySwiper"
                                breakpoints={{
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
                                }}
                            >
                                {/* {data?.variants?.[0]?.images?.map((imgSrc, imgIndex) => (
                                    <SwiperSlide key={imgIndex} className='swiper-img'>
                                        <img
                                            src={imgSrc}
                                            alt={`Product ${imgIndex + 1}`}
                                            onClick={() => setSelectedImage(imgSrc)}
                                            className={selectedImage === imgSrc ? 'active' : ''}
                                        />
                                    </SwiperSlide>
                                ))} */}
                                <SwiperSlide className='swiper-img'>
                                    <img
                                        src={`http://localhost:8080${state.brand.image}`}
                                        alt='product'
                                        className='img-fluid'
                                    />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className='product-details'>
                            <h2>{state.name}</h2>
                            <div className='price-section'>
                                <span className='price'>{state.price}</span> <br />
                                <span className='discount'>-{state.discount}%</span> Discount
                            </div>
                            {/* <div className='rating-section'>
                                <ReviewStars avgRating={4.5} totalReviews={review?.length} />
                            </div> */}
                            {/* <div className='description'>
                                <p>{data?.description}</p>
                            </div> */}
                            <div className='product-info'>
                                <div className='info-item'>
                                    <strong>SKU:</strong> {state.sku}
                                </div>
                                <div className='info-item'>
                                    <strong>Brand:</strong> {state.brand.brand}
                                </div>
                                {/* <div className='info-item'>
                                    <strong>Material:</strong>
                                </div>
                                <div className='info-item'>
                                    <strong>Stock:</strong>  units
                                </div>
                                <div className='info-item'>
                                    <strong>Gender:</strong>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                {/* <div className='reviews-section mt-4'>
                    <h3>Customer Reviews</h3>
                    {review?.map((reviewItem) => (
                        <div key={reviewItem.id} className='review-item'>
                            <div className='review-header'>
                                <ReviewCommentStars avgRating={reviewItem.rating} />
                                <span className='review-date'>{getDaysAgo(reviewItem.createdAt)}</span>
                            </div>
                            <div className='review-content'>
                                <p>{reviewItem.comment}</p>
                                <small>- {reviewItem.userName}</small>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
            <ToastContainer />
        </>
    );
}

export default ViewProduct;