import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [category,setCategory] = useState("Men");
  const [subCategory,setSubCategory] = useState("Topwear");
  const [bestseller,setBestseller] = useState(false);
  const [sizes,setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div className="add-product">
      <form onSubmit={onSubmitHandler}>
        <h3>Add New Product</h3>

        <div className='form-group'>
          <p>Upload Images</p>
          <div className='image-upload-container'>
            <label htmlFor="image1">
              <img className='add-img' src={image1 ? URL.createObjectURL(image1) : "/upload_placeholder.svg"} alt="" />
            </label>
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" accept='image/*' hidden />
            <label htmlFor="image2">
              <img className='add-img' src={image2 ? URL.createObjectURL(image2) : "/upload_placeholder.svg"} alt="" />
            </label>
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" accept='image/*' hidden />
            <label htmlFor="image3">
              <img className='add-img' src={image3 ? URL.createObjectURL(image3) : "/upload_placeholder.svg"} alt="" />
            </label>
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" accept='image/*' hidden />
            <label htmlFor="image4">
              <img className='add-img' src={image4 ? URL.createObjectURL(image4) : "/upload_placeholder.svg"} alt="" />
            </label>
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" accept='image/*' hidden />
          </div>
        </div>

        <div className='form-group'>
          <p>Product Name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Enter product name' required />
        </div>

        <div className='form-group'>
          <p>Product Description</p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Write product description' required />
        </div>

        <div className='form-row'>
          <div className='form-group'>
            <p>Product Category</p>
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className='form-group'>
            <p>Sub Category</p>
            <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory}>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div className='form-group'>
            <p>Product Price</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='$25' required />
          </div>
        </div>

        <div className='form-group'>
          <p>Product Sizes</p>
          <div className='size-selector'>
            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <div
                key={size}
                onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}
                className={`size-option ${sizes.includes(size) ? 'selected' : ''}`}>
                {size}
              </div>
            ))}
          </div>
        </div>

        <div className='form-group-checkbox'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
          <label htmlFor="bestseller">Add to Bestseller</label>
        </div>

        <button type="submit" className='add-btn'>ADD PRODUCT</button>
      </form>
    </div>
  )
}

export default Add
