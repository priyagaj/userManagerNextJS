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
  const [userList, setUserList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>({});
  const { list = [], searchVal } = useAppSelector((state) => state.user);

  useEffect(() => {
    let newList:User[] = [...list];
    if(searchVal.length === 0){
        newList = [...list]
    }
    if(searchVal.length > 1){
        newList = list?.filter((item) => item.name.toLowerCase().includes(searchVal))
        // console.log('search usr',newList,userList)
    }
    
    setUserList(newList)
  }, [list,searchVal]);
  const tableHead = ["Name", "Age", "Gender", "Role", "Actions"];
  const editUser = (user: User) => {
    setSelectedUser(user);
    document.getElementById("my_modal_2").showModal();
  };
  const deleteUser = (user: User) => {
    dispatch(deleteItem(user));
    // console.log("delete------", user);
  };
  // console.log('userList--------',userList)
  return (
    <div className="overflow-x-auto mx-20">
      {userList?.length ? (
        <>
          <table className="table border-2 max-w-3/4">
            {/* head */}
            <thead className="border-5 bg-gray-900 font-bold text-white text-base">
              <tr>
                {tableHead?.map((val, idx) => {
                  return <th key={idx}>{val}</th>;
                })}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userList?.map((item, idx) => {
                return (
                  <tr className="hover" key={idx}>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.gender}</td>
                    <td>{item.role}</td>
                    <td>
                      <button
                        className="btn btn-outline btn-info btn-sm mr-2"
                        onClick={() => editUser(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline btn-error btn-sm"
                        onClick={() => deleteUser(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <EditUser currentUser={selectedUser} />
        </>
      ) : <p className="text-center text-lg ">No Users found!!!</p>}
    </div>
  );
};

export default UserTable;
