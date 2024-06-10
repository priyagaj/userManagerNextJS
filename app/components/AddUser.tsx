"use client";

import { create, setSearchVal } from "@/lib/features/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  //console.log(errors)
  const dispatch = useAppDispatch();
  const openAddUser = () => {
    document.getElementById("my_modal_1").showModal();
  };
 
  const searchByName = (e) => {
    dispatch(setSearchVal(e.target.value))
  }

  const validateAge = (value) => {
    if (!value) return "Age is required";
    if (isNaN(value)) return "Age must be a number";
    if (value < 0) return "Age cannot be negative";
    if (value < 18) return "You must be at least 18 years old";
    if (value > 120) return "Age cannot be greater than 120";
    return true;
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const dob = new Date(birthdate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <>
      <div className="flex justify-between my-5 mx-20">
        <label className="input input-bordered flex items-center gap-2 w-150">
          <input
            type="text"
            className="grow w-full max-w-150"
            placeholder="Search by Name"
            onChange={searchByName}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <button className="btn btn-neutral btn-md bg-gray-900 text-white" onClick={openAddUser}>
          Add User
        </button>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-lg text-center mb-3">Add User</h3>
          <form
            method="dialog"
            className="flex flex-col justify-center gap-y-2"
            onSubmit={handleSubmit((data) => {
              dispatch(
                create({ ...data, id: Math.random().toString(16).slice(-4) })
              );
              document.getElementById("my_modal_1")?.close();
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
              {...register("age", { validate : validateAge})}
              type="number"
              placeholder="Age"
              className="input input-bordered  my-2"
              min={18}
              max={100}
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
            <div></div>
            <button
              className="btn btn-primary w-28 ml-auto bg-gray-900 text-white"
              disabled={isSubmitting}
            >
              Create
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddUser;
