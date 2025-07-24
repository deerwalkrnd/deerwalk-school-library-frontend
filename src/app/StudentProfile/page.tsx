import StudentProfile from '@/modules/StudentProfile/presentation/components/StudentProfile';
import React from 'react'

const page = () => {
  return (
    <div>
        <div className='p-8'>
            <h2 className='text-3xl font-[600]'>Your Profile</h2>
            <h1 className='text-base font-[500] text-[#5A5858]'> View and Manage Your Library Profile </h1>
        </div>
        <div>
            <StudentProfile 
              name='John Doe'
              email='johndoe@deerwalk.edu.np'
              avatarFallback='JD'
              avatarUrl='/placeholder.svg?height=100&width=100'

            />
        </div>
    </div>
  )
}

export default page;