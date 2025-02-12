import { MapPin as MapPinIcon, Cake as CakeIcon} from "lucide-react";

import {useState, useEffect } from "react";

import {USERS} from "./config";



function App() {
const [searchText, setSearchText] = useState("");
const [filteredUsers,setFilteredUsers] = useState(USERS);
const [filterCity, setFilterCity] = useState("");

useEffect(() => {
  if (!searchText){
    setFilteredUsers(USERS);
    return;
  }
   const tempFilteredUsers = USERS.filter((user) => {
    if(user.name.toLocaleLowerCase().includes(searchText)){
      return true;
    }
    else if (user.city.toLocaleLowerCase().includes(searchText)){
      return true;
    }
    else if (user.age.toString().includes(searchText)){
      return true;
    }else {
      return false;
    }
    });
    setFilteredUsers(tempFilteredUsers);
}, [searchText]);

  return (
    <div className="bg-slate-100 min-h-screen">
<h1 className="text-center text-blue-500 text-4xl fount-bold py-5">
  Search sort filter
</h1>

<input type="text"
 placeholder="Search" 
 className="w-2/3 p-2 mt-10  bg-white block mx-auto rounded-lg text-2xl
  focus:outline-none border-gray-200" 
  value={searchText}
  onChange={(e) => setSearchText(e.target.value.toLocaleLowerCase())}
/>
{
  searchText ?(
<p className="text-center mt-1">
  {filteredUsers.length===0
  ?"Oops! no user found...Try another search..."
  :`found  ${filteredUsers.length} user for search resulte.....`}`
  </p>
) : null}

<div className="flex justify-around">
  <div>
    <span>Filter By City: </span>
    <select className="bg-white text-lg my-2  rounded-lg px-5"
    value={filterCity}
    onChange={(e) => setFilterCity(e.target.value)}
    >

      <option value="">All</option>
      <option value="Mumbai">Mumbai</option>
      <option value="Delhi">Delhi</option>
      <option value="Bangalore">Bangalore</option>
      <option value="Hyderabad">Hyderabad</option>
      
    </select>
  </div>
  <div> 
    <span>Filter By Age: </span>
    <select className="bg-white text-lg my-2  rounded-lg px-5">
      <option value="">All</option>
      <option value="25">25</option>
      <option value="29">29</option>
      <option value="30">30</option>
      <option value="67">67</option>
      
    </select></div>
</div>

<div className="flex flex-wrap justify-around">
   {filteredUsers.map((userData, index)=>{
    const {name, city ,age,avatar} = userData
    return(
      <div className="bg-white shadow-lg mb-5 px-5 mx-6 py-2 rounded-lg w-[400px] flex"
      key={index}
      >
        <img src={avatar} className="h-15 rounded-full mr-4" />
        <div>
        <h1 className="font-bold text-lg border-b border-gray-200 pb-2">
           {name}
           </h1>
        <div className="flex mt-2">

        <p className="w-[100px] flex align-end">
        <CakeIcon className="inline" />{age}
        </p>

        <p className="flex mt-2">
         <MapPinIcon className="ml-4 inline" /> {city}
         </p>
        
           
      </div>
      </div>
      </div>
    )
  })}
</div>
    </div>
  )
}
export default App;