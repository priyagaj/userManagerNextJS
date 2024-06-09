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
  console.log('currentUser',currentUser)
  
  const openAddUser = () => {
    document.getElementById("my_modal_2").showModal();
  };
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
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
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Name"
              className="input input-bordered  my-2"
            />
            {errors.name && (
              <p className="text-red-500">{`${errors.name.message}`}</p>
            )}
            <input
              {...register("age", { required: "Age is required" })}
              type="number"
              placeholder="Age"
              className="input input-bordered  my-2"
            />
            {errors.age && (
              <p className="text-red-500">{`${errors.age.message}`}</p>
            )}
            <input
              {...register("date", { required: "Birhday is required" })}
              type="date"
              placeholder="Birthday"
              className="input input-bordered  my-2"
            />
            {errors.date && (
              <p className="text-red-500">{`${errors.date.message}`}</p>
            )}
            <div className="form-control">
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
            </div>
            <div className="form-control">
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
            <select
              className="select select-bordered w-full my-2"
              {...register("role", { required: "Please select a user role" })}
            >
              <option disabled selected>
                Role
              </option>
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
              className="btn btn-primary w-28 ml-auto"
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
