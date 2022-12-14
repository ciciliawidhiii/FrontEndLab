import {React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Sidenav from "../../components/Sidenav";

import axios from "axios";
import jwt_decode from "jwt-decode"

export default function Homepage(){
    const [name, setName] = useState('')
    const [token, setToken] = useState('')
    const [expired, setExpired] = useState('')
    const [cookies] = useCookies(["token"])
    const navigate = useNavigate();
    
    const decode = async () => {
        try {
          const decoded = jwt_decode(cookies.token);
          setName(decoded.name);
        } catch (error) {
          if (!cookies.token) {
            navigate("/");
          }
        }
      };

    return(
        <div>
            <div className="absolute">
              <Sidenav />
            </div>
            <div class="px-10 text-center h-[100vh] bg-[#f6f6f2]">
                <div class="p-4">
                    <div class="bg-[#388087] rounded-xl py-1"> 
                        <h1 class="font-bold text-white font-serif">Home</h1>
                    </div>
                    <div className="text-center">
                      <h3>Selamat Datang Admin</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}