import React, {useState} from 'react'
import Modal from './Modal'
import {NavLink, useNavigate} from 'react-router-dom'
import {FaUserAlt, FaDiceD6, FaBars, FaHome, FaSignOutAlt} from "react-icons/fa"
import LogoDashboard from "../assets/images/logo-dteti-dashboard.png"
import axios from 'axios'
import { useCookies } from "react-cookie";



const Sidenav = ({children}) => {
    const[isOpen, setIsOpen] = useState(false);
    const [cookies, removeCookie] = useCookies(["token"]);
    const toggle = () => setIsOpen (!isOpen);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState({
        message:"",
        isLoading:false
      });
    const menuItem =[
        {
            path:'/home',
            name:'Home',
            icon:<FaHome/>
        },
        {
            path:'/profile',
            name:'My Profile',
            icon:<FaUserAlt/>
        },
        {
            path:'/module',
            name:'My Module',
            icon:<FaDiceD6/>
        },
    ]

    const Logout = async() => {
        try{
            await axios.post('https://api-paw.bekisar.net/api/v1/auth/logout' , {
                headers: {
                  authorization: `Bearer ${cookies.token}`,
                },
            });
            removeCookie("token", { path: "/" });
            navigate("/login")
        } catch(error){
            console.log(error);
        }
    }
    
    const handleModal = (message, isLoading) => {
        setShowModal({
          message,
          isLoading,
        })
      }
    const handleLogout = () => {
        handleModal("Are you sure want to logout?", true);
    }
    const confirmLogout = (yes) => {
        if(yes){
            Logout();
        }
        else{
            handleModal("", false);
        }

    }

    return (
       <div className='flex m-auto '> 
         <div style={{width: isOpen ? "300px" : "50px"}} className="bg-[#6fb3b8] text-white h-auto w-[300px] transition-all">
             <div className="flex items-center py-[20px] px-[15px]">
                <img src={LogoDashboard} style={{display: isOpen ? "block" : "none"}} className="flex w-[85%]"></img>
                <div style={{marginLeft: isOpen ? "10px" : "0"}} className="flex text-[25px] mt-[20px]">
                <FaBars onClick={toggle}/>
                </div>    
             </div>
             <div>
                <button class="pointer-events-none" style={{display: isOpen? "block" : "none"}}>_____________________________________</button>
             </div>
             {
                menuItem.map((item, index)=>(
                    <NavLink to={item.path} key={index} className="flex text-current decoration-transparent py-[10px] px-[15px] gap-[15px] hover:bg-[#badfe7] hover:text-[#388087] focus:bg-[#badfe7] focus:text-[#388087]">
                        <div className="text-[20px] py-2.5">{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}} className="text-[20px] py-1">{item.name}</div>
                    </NavLink>
                )) 
             }
             <div>
                <button class="pointer-events-none" style={{display: isOpen? "block" : "none"}}>_____________________________________</button>
             </div>
             <NavLink onClick={handleLogout} className="flex text-current decoration-transparent py-[10px] px-[15px] gap-[15px] hover:bg-[#ffb4b3] hover:text-[#c91212] hover:font-bold focus:bg-[#ffb4b3] focus:text-[#c91212] focus:font-bold">
                <div className="text-[20px] py-2.5">{<FaSignOutAlt/>}</div>
                <div style={{display: isOpen ? "block" : "none"}} className="text-[20px] py-1" >Logout</div>
             </NavLink>
         </div>
         {showModal.isLoading && <Modal onDialog={confirmLogout} message={showModal.message}/>}
         <main className='min-h-screen'>{children}</main>
       </div>
       
    )
}

export default Sidenav;