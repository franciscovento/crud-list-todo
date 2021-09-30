import React from 'react'

const Deleted = ({task}) => {
  return (
    <div className='flex gap-5 items-center justify-between w-72 sm:w-96'>
        <div className='flex items-center gap-2'>
        <input type="checkbox" className='checked:bg-red-400' readOnly checked={true} />  
        <h2 className={'line-through text-gray-400'}>{task}</h2>
        
    </div>
</div>
  )
}

export default Deleted
