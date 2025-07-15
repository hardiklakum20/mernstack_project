import '../../Assets/scss/ProductVariant.css';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import namer from 'color-namer';


export function ProductVariant() {
    const animatedComponents = makeAnimated();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [sizeOptions, setSizeOptions] = useState([]);
    const [variantOptions, setVariantOptions] = useState([]);
    const [variantSections, setVariantSections] = useState([

        {
            id: Date.now(),
            color: '',
            size: '',
            price: '',
            stock: '',
            discount: '',
            images: []
        }
    ]);

    const [productName, setProductName] = useState();
    const [status, setStatus] = useState(1);




    const capitalizeWords = (str) =>
        str.replace(/\b\w/g, (char) => char.toUpperCase());

    const handleAddVariant = () => {
        setVariantSections([
            ...variantSections,
            {
                id: Date.now(),
                color: null,
                size: null,
                price: '',
                stock: '',
                images: []
            }
        ]);
    };

    const handleDeleteVariant = (idToDelete) => {
        setVariantSections(variantSections.filter(section => section.id !== idToDelete));
    };
    const handleImageChange = (event, variantIndex) => {
        // Get selected files as an array
        const selectedFiles = Array.from(event.target.files);
        if (!selectedFiles || selectedFiles.length === 0) return;

        selectedFiles.forEach(file => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const imageDataUrl = e.target.result;

                const newImage = {
                    id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                    src: imageDataUrl,
                    file: file,
                    name: file.name
                };

                setVariantSections(prevSections => {
                    const updatedSections = [...prevSections];
                    updatedSections[variantIndex] = {
                        ...updatedSections[variantIndex],
                        images: [...updatedSections[variantIndex].images, newImage]
                    };
                    return updatedSections;
                });
            };

            reader.readAsDataURL(file);
        });

        event.target.value = '';
    };

    const removeImage = (variantIndex, imageId) => {
        console.log(`Removing image ${imageId} from variant ${variantIndex}`);

        setVariantSections(prevSections => {
            const updatedSections = [...prevSections];

            updatedSections[variantIndex] = {
                ...updatedSections[variantIndex],
                images: updatedSections[variantIndex].images.filter(img => img.id !== imageId)
            };

            return updatedSections;
        });
    };

    const handleColor = async () => {
        try {
            const url = 'http://localhost:8080/api/get-color';

            const response = await axios.get(url);
            console.log(response.data.color[0].color, 'get color');

            if (response?.data?.status === true) {
                setVariantOptions({
                    color: response.data.color.map((c) => {
                        const name = capitalizeWords(namer(c.color).basic[0]?.name || 'Unknown');
                        return {
                            label: name,
                            value: c._id,
                        }
                    })
                });

            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSize = async () => {
        try {
            const url = 'http://localhost:8080/api/get-size';

            const response = await axios.get(url);
            console.log(response.data.size[0].size, 'get size');

            if (response?.data?.status === true) {
                setSizeOptions({
                    size: response.data.size.map((s) => {
                        return {
                            label: s.size,
                            value: s._id,
                        }
                    })
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleColor();
        handleSize();
    }, [])

    const handleSubmit = async () => {
        try {
            const url = 'http://localhost:8080/api/add-variant';
            const formData = new FormData();
            formData.append("productId", state);
            formData.append('productName', productName);
            formData.append('status', status);

            // Prepare variants data without images
            const cleanVariants = variantSections.map(section => {
                return {
                    color: section.color?.value || null,
                    size: section.size?.value || null,
                    price: section.price,
                    stock: section.stock,
                    discount: section.discount || 0
                };
            });

            // Append the variants array as JSON string
            formData.append('variants', JSON.stringify(cleanVariants));

            // Append images like variants[0].images, variants[1].images, etc.
            variantSections.forEach((section, index) => {
                section.images.forEach(image => {
                    formData.append(`variants[${index}].images`, image.file);
                });
            });

            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log(response, 'variants');

            if (response.status === 201) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/product/variant', { state: state });
                }, 1500);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };


    return (
        <>
            <div className="product-head">
                <h3>Add Product Variant</h3>
            </div>

            <div className='product-body body-bg'>
                <label className='input-label'>Product Variant Name</label>
                <input
                    type='text'
                    className='variant'
                    onChange={(e) => setProductName(e.target.value)}
                />

                <label className="category-brand">Select Status Flag</label>
                <select
                    className="add-category"
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>

                <div className='d-flex justify-content-between mt-4'>
                    <p className='variant-title'>Variant</p>
                    <button
                        type="button"
                        className='default-btn btn'
                        onClick={handleAddVariant}
                    >
                        Add Variant
                    </button>
                </div>

                {variantSections.map((section, index) => {
                    return (
                        <div key={section.id} className="row mt-4 align-items-end">
                            <div className="col-lg-3 col-md-6 mt-lg-0">
                                <label>Color</label>
                                <Select
                                    components={animatedComponents}
                                    options={variantOptions.color}
                                    onChange={(selectedOption) => {
                                        // setColor(selectedOption.value);
                                        const updatedSections = [...variantSections];
                                        updatedSections[index].color = selectedOption;
                                        setVariantSections(updatedSections);
                                    }}
                                    value={section.color}
                                />
                            </div>
                            <div className="col-lg-3 col-md-6 mt-lg-0 mt-md-0 mt-3">
                                <label>Size</label>
                                <Select
                                    components={animatedComponents}
                                    options={sizeOptions.size}
                                    onChange={(selectedOption) => {
                                        // setSize(selectedOption.value);

                                        const updatedSections = [...variantSections];
                                        updatedSections[index].size = selectedOption; // Correct field: size
                                        setVariantSections(updatedSections); // Correct setter
                                    }}
                                    value={section.size} // Correct field: size
                                />
                            </div>
                            <div className="col-lg-3 col-md-6 mt-lg-0 mt-md-3 mt-3">
                                <label>Price</label>
                                <input
                                    type="number"
                                    className="price-select"
                                    placeholder='Price'
                                    onChange={(e) => {
                                        const updatedSections = [...variantSections];
                                        updatedSections[index].price = e.target.value;
                                        setVariantSections(updatedSections);
                                    }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-6 mt-lg-0 mt-md-3 mt-3">
                                <label>Stock</label>
                                <input
                                    type="number"
                                    className="stock-select"
                                    placeholder='Stock'
                                    onChange={(e) => {
                                        const updatedSections = [...variantSections];
                                        updatedSections[index].stock = e.target.value;
                                        setVariantSections(updatedSections);
                                    }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-6 mt-lg-2 mt-md-3 mt-3">
                                <label>Discount</label>
                                <input
                                    type="number"
                                    className="stock-select"
                                    placeholder='Discount'
                                    onChange={(e) => {
                                        const updatedSections = [...variantSections];
                                        updatedSections[index].discount = e.target.value;
                                        setVariantSections(updatedSections);
                                    }}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <label>Upload Images</label>
                                <input
                                    type="file"
                                    className="form-control shadow-none"
                                    onChange={(e) => handleImageChange(e, index)}
                                    multiple
                                    accept="image/*"
                                    key={`file-input-${section.id}-${section.images.length}`}
                                />

                                {/* Display image count */}
                                <small className="text-muted d-block mt-1">
                                    {section.images.length} image(s) selected
                                </small>

                                {/* Image preview container */}
                                {section.images.length > 0 && (
                                    <div className="preview-container mt-3 d-flex flex-wrap">
                                        {section.images.map((img) => (
                                            <div key={img.id} className="position-relative me-3 mb-3">
                                                <img
                                                    src={img.src}
                                                    alt={img.name || "preview"}
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'cover',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-danger position-absolute"
                                                    onClick={() => removeImage(index, img.id)}
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        padding: '0',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: '50%',
                                                        top: '-8px',
                                                        right: '-8px',
                                                        fontSize: '16px',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="col-2 mt-3">
                                {variantSections.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDeleteVariant(section.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}

                <div className="mt-4 d-flex align-items-center gap-3">
                    <button type="button" className="btn default-btn" onClick={handleSubmit}
                    >
                        Submit Variants
                    </button>
                    <button type="button" className="btn btn-closes" onClick={() => navigate("/product")}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}