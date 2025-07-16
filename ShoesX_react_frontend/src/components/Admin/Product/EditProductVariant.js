import "../../Assets/scss/ProductVariant.css";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import namer from "color-namer";

export default function EditProductVariant() {
  const animatedComponents = makeAnimated();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [sizeOptions, setSizeOptions] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);
  const [variantSections, setVariantSections] = useState([]);
  const [productName, setProductName] = useState(state.productName);
  const [status, setStatus] = useState(state.status);
  // const { productId } = location.state || {};

  console.log(state, 'state edit variant');

  // Initialize variant sections with proper structure
  useEffect(() => {
    if (state.variants && sizeOptions.length > 0 && variantOptions.length > 0) {
      const initializedVariants = state.variants.map((variant) => ({
        ...variant,
        id: variant._id || variant.id || Date.now(),
        // Convert color and size to proper Select format
        color: variant.color ?
          (typeof variant.color === 'object' && variant.color.value ?
            variant.color :
            variantOptions.find(opt => opt.value === (variant.color._id || variant.color))
          ) : null,
        size: variant.size ?
          (typeof variant.size === 'object' && variant.size.value ?
            variant.size :
            sizeOptions.find(opt => opt.value === (variant.size._id || variant.size))
          ) : null,
        newImageFiles: [],
        imagesPreviews: variant.images ? variant.images.map((img, index) => ({
          id: `existing-${index}`,
          filename: img,
          // Check if img is already a full URL (starts with http/https)
          previewUrl: img.startsWith('http') ? img : `${process.env.REACT_APP_CLOUD_BASE_URL}/${img.replace(/\\/g, "/")}`,
          isExisting: true
        })) : [],
        removedImages: []
      }));
      setVariantSections(initializedVariants);
    }
  }, [state.variants, sizeOptions, variantOptions]);

  const handleAddVariant = () => {
    setVariantSections([
      ...variantSections,
      {
        id: Date.now(),
        color: null,
        size: null,
        price: "",
        stock: "",
        discount: "",
        images: [],
        newImageFiles: [],
        imagesPreviews: [],
        removedImages: [],
      },
    ]);
  };

  const handleDeleteVariant = (idToDelete) => {
    setVariantSections(variantSections.filter((v) => v.id !== idToDelete));
  };

  const handleChange = (index, field, value) => {
    const updated = [...variantSections];
    updated[index][field] = value;
    setVariantSections(updated);
  };

  const removeImage = (variantIndex, imageId) => {
    const updated = [...variantSections];
    const variant = updated[variantIndex];
    const imageToRemove = variant.imagesPreviews.find((img) => img.id === imageId);

    if (!imageToRemove) return;

    if (imageToRemove.isExisting) {
      if (!variant.removedImages) {
        variant.removedImages = [];
      }
      variant.removedImages.push(imageToRemove.filename);
    } else {
      variant.newImageFiles = variant.newImageFiles.filter(
        (file) => file.name !== imageToRemove.filename
      );
    }

    variant.imagesPreviews = variant.imagesPreviews.filter(
      (img) => img.id !== imageId
    );

    setVariantSections(updated);
  };

  const handleImageChange = (event, index) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const updated = [...variantSections];
    const variant = updated[index];

    // Initialize arrays if they don't exist
    if (!variant.newImageFiles) {
      variant.newImageFiles = [];
    }
    if (!variant.imagesPreviews) {
      variant.imagesPreviews = [];
    }

    // Store the actual File objects for upload
    variant.newImageFiles = [...variant.newImageFiles, ...files];

    // Create preview objects for display
    const newPreviews = files.map((file) => ({
      id: Date.now() + Math.random(),
      filename: file.name,
      previewUrl: URL.createObjectURL(file),
      isExisting: false,
      file: file,
    }));

    // Add new previews to existing previews
    variant.imagesPreviews = [...variant.imagesPreviews, ...newPreviews];

    setVariantSections(updated);
  };

  const capitalizeWords = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  const handleColor = async () => {
    try {
      const url = `${process.env.REACT_APP_URL}/get-color`;
      const response = await axios.get(url);
      console.log(response.data.color[0].color, 'get color');

      if (response?.data?.status === true) {
        setVariantOptions(
          response.data.color.map((c) => {
            const name = capitalizeWords(namer(c.color).basic[0]?.name || 'Unknown');
            return {
              label: name,
              value: c._id,
            }
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSize = async () => {
    try {
      const url = `${process.env.REACT_APP_URL}/get-size`;
      const response = await axios.get(url);
      console.log(response.data.size[0].size, 'get size');

      if (response?.data?.status === true) {
        setSizeOptions(
          response.data.size.map((s) => {
            return {
              label: s.size,
              value: s._id,
            }
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleColor();
    handleSize();
  }, [])

  const handleEdit = async () => {
    try {
      // Validate that all variants have color and size
      const validationErrors = [];
      variantSections.forEach((variant, index) => {
        if (!variant.color) {
          validationErrors.push(`Variant ${index + 1}: Please select a color`);
        }
        if (!variant.size) {
          validationErrors.push(`Variant ${index + 1}: Please select a size`);
        }
      });

      if (validationErrors.length > 0) {
        toast.error(validationErrors.join('\n'));
        return;
      }

      const formData = new FormData();

      formData.append("productId", state.productId);
      formData.append("productName", productName);
      formData.append("status", status);

      // Prepare variants data - send only IDs for color and size
      const variantsData = variantSections.map((variant, index) => {
        const { newImageFiles, imagesPreviews, ...rest } = variant;

        // Get existing images that weren't removed
        const existingImages = (variant.images || []).filter(img =>
          !variant.removedImages.includes(img)
        );

        // Extract color and size IDs properly
        let colorId = null;
        let sizeId = null;

        // Handle color - could be object or string
        if (variant.color) {
          if (typeof variant.color === 'object' && variant.color.value) {
            colorId = variant.color.value;
          } else if (typeof variant.color === 'string') {
            colorId = variant.color;
          } else if (variant.color._id) {
            colorId = variant.color._id;
          }
        }

        // Handle size - could be object or string
        if (variant.size) {
          if (typeof variant.size === 'object' && variant.size.value) {
            sizeId = variant.size.value;
          } else if (typeof variant.size === 'string') {
            sizeId = variant.size;
          } else if (variant.size._id) {
            sizeId = variant.size._id;
          }
        }

        console.log(`Variant ${index}:`, {
          colorId,
          sizeId,
          originalColor: variant.color,
          originalSize: variant.size
        });

        return {
          ...rest,
          color: colorId,
          size: sizeId,
          images: existingImages,
          index
        };
      });

      console.log('Final variants data:', variantsData);
      formData.append("variants", JSON.stringify(variantsData));

      // Append new images
      variantSections.forEach((variant, index) => {
        if (variant.newImageFiles && Array.isArray(variant.newImageFiles)) {
          variant.newImageFiles.forEach((file) => {
            formData.append(`variants[${index}].images`, file);
          });
        }
      });

      const url = `${process.env.REACT_APP_URL}/edit-variant/${state._id}`;
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/product', { state: state });
        }, 1500);
      }
    } catch (error) {
      console.error("Error updating variant:", error);
      toast.error("Update failed");
    }
  };

  return (
    <>
      <div className="product-head">
        <h3>Edit Product Variant</h3>
      </div>
      <div className="product-body body-bg">
        <label className="input-label">Product Variant Name</label>
        <input
          type="text"
          className="variant"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label className="category-brand">Select Status Flag</label>
        <select
          className="add-category"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>

        <div className="d-flex justify-content-between mt-4">
          <p className="variant-title">Variant</p>
          <button className="default-btn btn" onClick={handleAddVariant}>
            Add Variant
          </button>
        </div>

        {variantSections.map((section, index) => (
          <div key={section.id || index} className="row mt-4 align-items-end">
            <div className="col-lg-3 col-md-6">
              <label>Color</label>
              <Select
                components={animatedComponents}
                options={variantOptions}
                value={section.color}
                onChange={(value) => handleChange(index, "color", value)}
                isClearable
                placeholder="Select Color"
              />
            </div>
            <div className="col-lg-3 col-md-6 mt-md-0 mt-2">
              <label>Size</label>
              <Select
                components={animatedComponents}
                options={sizeOptions}
                value={section.size}
                onChange={(value) => handleChange(index, "size", value)}
                isClearable
                placeholder="Select Size"
              />
            </div>
            <div className="col-lg-3 col-md-6 mt-lg-0 mt-md-3 mt-2">
              <label>Price</label>
              <input
                type="number"
                className="price-select"
                value={section.price}
                onChange={(e) => handleChange(index, "price", e.target.value)}
              />
            </div>
            <div className="col-lg-3 col-md-6 mt-lg-0 mt-md-3 mt-2">
              <label>Stock</label>
              <input
                type="number"
                className="stock-select"
                value={section.stock}
                onChange={(e) => handleChange(index, "stock", e.target.value)}
              />
            </div>
            <div className="col-lg-3 col-md-6 mt-lg-2 mt-md-3 mt-2">
              <label>Discount</label>
              <input
                type="number"
                className="stock-select"
                value={section.discount || ""}
                onChange={(e) => handleChange(index, "discount", e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label>Add Images (Select files to add more images)</label>
              <input
                type="file"
                className="form-control shadow-none"
                onChange={(e) => handleImageChange(e, index)}
                multiple
                accept="image/*"
              />
              <div className="preview-container mt-2 d-flex flex-wrap">
                {section.imagesPreviews &&
                  section.imagesPreviews.map((img, i) => (
                    <div key={img.id || i} className="position-relative me-2 mb-2">
                      <img
                        src={img.previewUrl}
                        alt="preview"
                        className="preview-img"
                        style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid #ddd' }}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        onClick={() => removeImage(index, img.id)}
                        style={{ fontSize: '12px', padding: '2px 6px' }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-2">
              {variantSections.length > 1 && (
                <button
                  className="btn btn-outline-danger mt-2"
                  onClick={() => handleDeleteVariant(section.id)}
                  type="button"
                >
                  <i className="bi bi-trash"></i>
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="mt-4 d-flex align-items-center gap-3">
          <button className="btn default-btn" onClick={handleEdit}>
            Update Variant
          </button>
          <button
            className="btn btn-closes"
            onClick={() => navigate(-1)}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}