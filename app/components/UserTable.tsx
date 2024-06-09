"use client";
import React, { useEffect, useState } from "react";
import EditUser from "./EditUser";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { create, deleteItem } from "@/lib/features/userSlice";
interface User {
    name: string;
    age: number;
    date: string;
    gender: string;
    role: string;
    id: number;
}
const UserTable = () => {
    const dispatch = useAppDispatch();
    const [userList,setUserList] = useState<User[]>([])
    const [selectedUser,setSelectedUser] = useState({})
   const { list = [] } =  useAppSelector(state => state.user);
  
   useEffect(() => {
    
   },[list])
  const tableHead = ["Name", "Age", "Gender", "Role", "Actions"];
  const editUser = (user:User) => {
    setSelectedUser(user)
    document.getElementById('my_modal_2').showModal()
  }
  const deleteUser = (user:User) => {
    dispatch(deleteItem(user))
    console.log('delete------',user)
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {tableHead?.map((val,idx) => {
              return <th key={idx}>{val}</th>;
            })}
            <th></th>
          </tr>
        </thead>
        <tbody>
            {
                list?.map((item,idx) => {
                    return <tr className="hover" key={idx}>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.gender}</td>
            <td>{item.role}</td>
            <td>
              <button className="btn btn-outline btn-info btn-sm mr-2" onClick={() => editUser(item)}>
                Edit
              </button>
              <button className="btn btn-outline btn-error btn-sm" onClick={() => deleteUser(item)}>
                Delete
              </button>
            </td>
          </tr>
                })
            }
        </tbody>
      </table>
      <EditUser currentUser={selectedUser}/>
    </div>
  );
};

export default UserTable;
