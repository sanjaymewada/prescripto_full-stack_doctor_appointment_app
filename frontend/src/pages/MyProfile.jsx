import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(null)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            if (image) formData.append('image', image)

            const { data } = await axios.post(
                `${backendUrl}/api/user/update-profile`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(null)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message || 'Failed to update profile')
        }
    }

    if (!userData) return null

    return (
        <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>
            {/* PROFILE IMAGE */}
            {isEdit
                ? <label htmlFor='image' className='cursor-pointer'>
                    <div className='relative inline-block'>
                        <img
                            className='w-36 rounded opacity-75'
                            src={image ? URL.createObjectURL(image) : userData.image}
                            alt="profile"
                        />
                        {!image && <img className='w-10 absolute bottom-12 right-12' src={assets.upload_icon} alt="upload" />}
                    </div>
                    <input
                        id='image'
                        type="file"
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>
                : <img className='w-36 rounded' src={userData.image} alt="profile" />
            }

            {/* NAME */}
            {isEdit
                ? <input
                    className='bg-gray-50 text-3xl font-medium max-w-60'
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                />
                : <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.name}</p>
            }

            <hr className='bg-[#ADADAD] h-[1px] border-none' />

            {/* CONTACT INFO */}
            <div>
                <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>

                    <p className='font-medium'>Phone:</p>
                    {isEdit
                        ? <input
                            className='bg-gray-50 max-w-52'
                            type="text"
                            value={userData.phone || ''}
                            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                        : <p className='text-blue-500'>{userData.phone}</p>
                    }

                    <p className='font-medium'>Address:</p>
                    {isEdit
                        ? <div>
                            <input
                                className='bg-gray-50 w-full my-1'
                                type="text"
                                value={userData.address?.line1 || ''}
                                onChange={(e) => setUserData(prev => ({
                                    ...prev,
                                    address: { ...prev.address, line1: e.target.value }
                                }))}
                            />
                            <input
                                className='bg-gray-50 w-full my-1'
                                type="text"
                                value={userData.address?.line2 || ''}
                                onChange={(e) => setUserData(prev => ({
                                    ...prev,
                                    address: { ...prev.address, line2: e.target.value }
                                }))}
                            />
                        </div>
                        : <p className='text-gray-500'>{userData.address?.line1}<br />{userData.address?.line2}</p>
                    }
                </div>
            </div>

            {/* BASIC INFO */}
            <div>
                <p className='text-[#797979] underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
                    <p className='font-medium'>Gender:</p>
                    {isEdit
                        ? <select
                            className='bg-gray-50 max-w-20'
                            value={userData.gender || 'Not Selected'}
                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                        >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className='text-gray-500'>{userData.gender}</p>
                    }

                    <p className='font-medium'>Birthday:</p>
                    {isEdit
                        ? <input
                            type='date'
                            className='bg-gray-50 max-w-28'
                            value={userData.dob || ''}
                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                        />
                        : <p className='text-gray-500'>{userData.dob}</p>
                    }
                </div>
            </div>

            {/* BUTTONS */}
            <div className='mt-10'>
                {isEdit
                    ? <button
                        type="button"
                        onClick={updateUserProfileData}
                        className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
                    >
                        Save information
                    </button>
                    : <button
                        type="button"
                        onClick={() => setIsEdit(true)}
                        className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
                    >
                        Edit
                    </button>
                }
            </div>
        </div>
    )
}

export default MyProfile
