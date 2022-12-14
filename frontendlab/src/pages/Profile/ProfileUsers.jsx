import './Profil.css';
import SidenavUsers from '../../components/SidenavUsers'
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProfileUsers = () => {
    const [user, setUser] = useState([]);
  
    useEffect(() => {
      getUser();
    }, []);
  
    const getUser = async () => {
      const response = await axios.get(`https://api-paw.bekisar.net/api/v1/auth/me`);
      console.log(response.data.data);
      //setUser(response.data.data);
    };
  
    return(
        <div>
            <div className="absolute">
              <SidenavUsers />
            </div>
            <div className="student p-4 bg-[#f6f6f2] min-h-screen">
                <div className="px-10">
                <div className="bg-[#388087] py-1 px-4 rounded-xl">
                    <h1 className=" text-center font-serif font-bold text-white">My Profile</h1>
                </div>
                <div className="flex mt-4 justify-between gap-4">
                    <div className="bg-white rounded-xl shadow-sm w-full h-full p-4">
                    <div className="flex justify-between">
                        <div className="flex relative p-4">
                        <div className="flex items-center place-items-end searchs">
                           
                        </div>
                        </div> 
                    </div>

                    <div className="pb-10 cont-table">
                        <table className="w-full table-fixed text-left overflow-y-auto">
                        <thead className="bg-[#ecfcff] border-b-2 border-gray-300">
                            <tr className="border-b-2 border-gray-300 text-sm font-bold">
                                <th className="w-1/4 py-3 px-2">Nama</th>
                                <th className="w-1/6">NIM</th>
                                <th className="w-1/12 px-2">Batch</th>
                                <th className="w-1/4">Email</th>
                                <th className="w-1/5">Password</th>
                                <th className="w-1/6 px-3">No. HP</th>
                            </tr>
                        </thead>
                        {(user).map((dat, index) => {
                    return (
                      <tbody key={index}>
                        <tr className="py-8 border-b-2 border-gray-300 text-xs">
                        <td className="px-2 text-left">
                            {index+1}
                          </td>
                          <td className="px-2 text-left break-words">
                            {dat.name}
                          </td>
                          <td className="text-left break-words">
                            {dat.studentId}
                          </td>
                          <td className="px-2 text-left">
                            {dat.batch}
                          </td>
                          <td className=" text-left break-words">
                            {dat.email}
                          </td>
                          <td className="text-left break-words">
                            {dat.password}
                          </td>
                          <td className="px-3 text-left">
                            {dat.phone}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
                </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileUsers;