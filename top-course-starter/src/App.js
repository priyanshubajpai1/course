import { useEffect, useState } from 'react';
import {apiUrl, filterData} from "./data";
import './App.css';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import Cards from './components/Cards';
import {toast} from "react-toastify";
import Spinner from "./components/Spinner"

const App = () => {

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();
      // output
      setCourses(output.data);
    }
    catch(error){
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className=' bg-bgDark2 h-screen'>
      <div className='flex flex-col bg-bgDark2'>
        <Navbar/>
      </div>

      <div className='bg-bgDark2'>
        <div>
          <Filter 
          filterData = {filterData}
          category = {category}
          setCategory = {setCategory}/>
        </div>
        
        <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
          {
            loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
          }
        </div>
      </div>
      
      
    </div>
  );
};

export default App;

