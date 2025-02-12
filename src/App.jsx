import { MapPin as MapPinIcon, Cake as CakeIcon} from "lucide-react";

import {useState, useEffect } from "react";

import {USERS} from "./config";



function App() {
const [searchText, setSearchText] = useState("");
const [filteredUsers,setFilteredUsers] = useState(USERS);
const [filterCity, setFilterCity] = useState("");
const [filterAge, setFilterAge] = useState("");
const [SortOrder, setSortOrder] = useState("asc");

useEffect(() => {
  if (!searchText){
    setFilteredUsers(USERS);
    return;
  }
   const tempfilteredUsers = USERS.filter((user) => {
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
    setFilteredUsers(tempfilteredUsers);
}, [searchText]);

useEffect(()=>{
  if(!filterCity && !filterAge){
    setFilteredUsers(USERS);
    return;
  }
  const tempfilteredUsers = USERS.filter((user)=> {
if(filterCity &&
   user.city === filterCity &&
  filterAge &&
user.age === parseInt(filterAge)
){
  return true;
}

if (filterAge && !filterCity && user.age === parseInt(filterAge)){
  return true;
}
if (filterCity && !filterCity && user.city === parseInt(filterAge)){
  return true;
}

return false;
});
setFilteredUsers(tempfilteredUsers);
}, [filterCity,filterAge]);






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
    value={filterAge}
    onChange={(e) => setFilterAge(e.target.value)}
    >

      <option value="">All</option>
      {
        USERS.map((user) => {
          return<option key={user.city} value={user.city}>{user.city}</option>
        })
      }
     
      
    </select>
  </div>
  <div> 
    <span>Filter By Age: </span>
    <select className="bg-white text-lg my-2  rounded-lg px-5"
    value={filterCity}
    onChange={(e) => setFilterAge(e.target.value)}>
      <option value="">All</option>
      {
        USERS.map((user) => {
          return<option key={user.age} value={user.age}>{user.age}</option>
        })
      }
      
    </select></div>
</div>


<div>
        <span>Sort By Name:</span>
          <select className="bg-white text-lg my-2 rounded-lg px-5"
           value={SortOrder}
           onChange={(e)=> setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
           
          </select>
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