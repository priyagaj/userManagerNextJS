"use client";

import { create } from "@/lib/features/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { } from "react";
import { useForm } from "react-hook-form";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();
  //console.log(errors)
  const dispatch = useAppDispatch();
  const openAddUser = () => {
    document.getElementById("my_modal_1").showModal();
  };
  return (
    <>
      <div className="flex justify-center my-3">
        <button
          className="btn btn-outline btn-neutral btn-sm "
          onClick={openAddUser}
        >
          Add User
        </button>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
        <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
          <h3 className="text-lg text-center mb-3">Add User</h3>
          <form
            method="dialog"
            className="flex flex-col justify-center gap-y-2"
            onSubmit={handleSubmit((data) => {
              dispatch(create({...data, id: Math.random().toString(16).slice(-4)}))
              document.getElementById('my_modal_1')?.close()
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
              <option disabled>
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
            <div>
              
            </div>
            <button
              className="btn btn-primary w-28 ml-auto"
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
