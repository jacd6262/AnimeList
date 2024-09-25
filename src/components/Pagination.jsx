import { DivideIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Pagination = ({ pagination, setPageActive }) => {

   const totalPages = Math.ceil(pagination.items?.total / pagination.items?.per_page);
   console.log(totalPages);

   
   let pages = [];

   for(let i =1; i<=totalPages; i++){
     pages.push(i);
   }

   const handlepagination = (page)=>{
    setPageActive(page);
   }


  return (
    <div className='flex justify-center items-center gap-1'>
        {
          pages.map((page) => (
            <button 
                 className='bg-slate-700 text-white rounded-md p-2 hover:bg-slate-400 px-3 my-4 ' key={page}
                 onClick={() => handlepagination(page)}
            >
              {page}
            </button>
          ))
        }
    </div>
  )
}

export default Pagination