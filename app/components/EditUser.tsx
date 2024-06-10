"use client";

import { update } from "@/lib/features/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
interface User {
    name: string;
    age: number;
    date: string;
    gender: string;
    role: string;
    id: number;
}
const EditUser = ({currentUser}: {currentUser:User} ) => {
    const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm({
    values: currentUser
  });

  const validateAge = (value) => {
    if (!value) return "Age is required";
    if (isNaN(value)) return "Age must be a number";
    if (value < 0) return "Age cannot be negative";
    if (value < 18) return "You must be at least 18 years old";
    if (value > 120) return "Age cannot be greater than 120";
    return true;
  };
  // console.log('currentUser',currentUser)
  
  const openAddUser = () => {
    document.getElementById("my_modal_2").showModal();
  };
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                </button>
            </form>
          <h3 className="text-lg text-center mb-3">Edit User</h3>
          <form
            method="dialog"
            className="flex flex-col justify-center gap-y-2"
            onSubmit={handleSubmit((data) => {
              dispatch(update(data))
              document.getElementById('my_modal_2')?.close()
              reset();
            })}
          >
            <div className="label mb-0">
              <span className="label-text">Name</span>
            </div>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Name"
              className="input input-bordered  my-2"
            />
            {errors.name && (
              <p className="text-red-500">{`${errors.name.message}`}</p>
            )}
            <div className="label mb-0">
              <span className="label-text">Age</span>
            </div>
            <input
              {...register("age", { validate: validateAge })}
              type="number"
              placeholder="Age"
              className="input input-bordered  my-2"
              min="18"
              max="100"
            />
            {errors.age && (
              <p className="text-red-500">{`${errors.age.message}`}</p>
            )}
            <div className="label mb-0">
              <span className="label-text">Birthday</span>
            </div>
            <input
              {...register("date", { required: "Birthday is required" })}
              type="date"
              placeholder="Birthday"
              className="input input-bordered  my-2"
            />
            {errors.date && (
              <p className="text-red-500">{`${errors.date.message}`}</p>
            )}
            <div className="form-control">
                <div className="label mb-0">
                    <span className="label-text">Gender</span>
                </div>
              <label className="label justify-start cursor-pointer">
                <input
                  {...register("gender", { required: "Gender is required" })}
                  type="radio"
                  name="gender"
                  value={"male"}
                  className="radio checked:bg-blue-500 mx-3"
                />
                <span className="label-text">Male</span>
              </label>
              <label className="label justify-start cursor-pointer">
                <input
                  {...register("gender", { required: "Gender is required" })}
                  type="radio"
                  name="gender"
                  value={"female"}
                  className="radio checked:bg-red-500 mx-3"
                />
                <span className="label-text">Female</span>
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500">{`${errors.gender.message}`}</p>
            )}
            <div className="label mb-0">
              <span className="label-text">Role</span>
            </div>
            <select
              className="select select-bordered w-full my-2"
              {...register("role", { required: "Please select a user role" })}
            >
              <option value={"admin"}>Admin</option>
              <option value={"user"}>User</option>
              <option value={"guest"}>Guest</option>
            </select>
            {errors.role && (
              <p className="text-red-500">{`${errors.role.message}`}</p>
            )}
            <div className="form-control">
              <label className="label justify-start cursor-pointer">
                <input
                  {...register("terms", {
                    required:
                      "Please accept the terms and conditions before submitting",
                  })}
                  type="checkbox"
                  className="checkbox checkbox-primary mx-3"
                />
                <span className="label-text">
                  Please accept the terms and conditions before submitting the
                  form
                </span>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500">{`${errors.terms.message}`}</p>
            )}
            <button
              className="btn btn-primary w-28 ml-auto bg-gray-900"
              disabled={isSubmitting}
            >
              Update
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default EditUser;
