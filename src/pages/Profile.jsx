import React, { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import TextInput from "components/common/TextInput";
import uploadApi from "api/uploadApi";
import toBase64 from "utils/base64";
import { updateUser } from "redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.data)
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm();

  const rules = {
    nameRule: {
      required: false,
      maxLength: 50,
    },
    phoneNumberRule: {
      required: false,
    },
    titleRule: {
      required: false,
    },
    countryRule: {
      required: false,
    },
  };

  const onImageChange = async e => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64Img = await toBase64(e.target.files[0])
        const response = await uploadApi.uploadImg({ image: base64Img || '' })
        if (response.error_code === 0) {
          setImage(response.data.url)
        } else {
          toast.error('Cannot upload image')
        }
      } catch (err) { 
        toast.error("Cannot upload image");
      }
    }
  };

  const onSubmit = data => {
    const formData = { ...data, avatar: image || '', id: currentUser._id }
    const action = updateUser(formData)
    dispatch(action).then((response) => {
      if (response.payload.error_code === 0) {
        toast.success('Update profile successfully')
        reset()
      }
    })
  };

  return (
    <div className="w-full md:w-full lg:w-3/4 p-6 mx-auto">
      <div className="text-xl font-medium">Profile</div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 lg:col-span-6">
          <div className="box p-4">
            <div>
              <label>Avatar</label>
              <div className="image-upload border shadow-sm relative flex flex-col items-center justify-center rounded-md py-8 mt-3">
                <div className="w-12 h-12 rounded-full flex justify-center items-center bg-primary overflow-hidden">
                  {image ? <img src={image} alt="" className="w-full h-full object-cover" /> : <CiImageOn size={24} color="#fff" />}
                </div>
                <div className="mt-2 text-gray-400">Choose your avatar</div>
                <input type="file" onChange={onImageChange} className="w-full h-full top-0 left-0 absolute opacity-0" />
              </div>
            </div>
            <div className="mt-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label>Name</label>
                  <input type="text" className="text-input-form py-1 px-4 auth__input mt-2" {...register("name", rules.nameRule)} />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className="mt-3">
                  <label>Phone number</label>
                  <input type="text" className="text-input-form py-1 px-4 auth__input mt-2" {...register("phoneNumber", rules.phoneNumberRule)} />
                  {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                </div>
                <div className="mt-3">
                  <label>Title</label>
                  <input type="text" className="text-input-form py-1 px-4 auth__input mt-2" {...register("title", rules.titleRule)} />
                  {errors.titleRule && <p className="text-red-500">{errors.titleRule.message}</p>}
                </div>
                <div className="mt-3">
                  <label>Country</label>
                  <input type="text" className="text-input-form py-1 px-4 auth__input mt-2" {...register("country", rules.countryRule)} />
                  {errors.countryRule && <p className="text-red-500">{errors.countryRule.message}</p>}
                </div>
                <button type="submit" className="btn btn-primary w-full mt-3">
                  Save setting
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="box p-4">
            <div className="mt-3">
              <label>Current Password</label>
              <TextInput type="password" className="border rounded mt-2" size="small" placeholder="Current Password" />
            </div>
            <div className="mt-3">
              <label>New Password</label>
              <TextInput type="password" className="border rounded mt-2" size="small" placeholder="Current Password" />
            </div>
            <div className="mt-3">
              <label>Confirm Password</label>
              <TextInput type="password" className="border rounded mt-2" size="small" placeholder="Confirm Password" />
            </div>
            <button className="btn btn-primary mt-4">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
