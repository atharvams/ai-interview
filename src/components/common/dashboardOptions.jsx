import { PhoneCall, VideoIcon } from 'lucide-react'
import React from 'react'

function DashboardScheduleInterviewOptions() {
  return (
    <div className='grid grid-cols-2 gap-5'>
      <div className='bg-white border border-gray-200 rounded-xl p-5'>
        <VideoIcon className='p-3 text-primary bg-amber-100 h-12 w-12 rounded'/>
        <h2 className='text-xl font-bold mt-4'>
        Create new interview
        </h2>
        <p className='text-gray-500'>Schedule Ai interview and schedule with candidates.</p>
      </div>
      <div className='bg-white border border-gray-200 rounded-xl p-5'>
        <PhoneCall className='p-3 text-primary bg-amber-100 h-12 w-12 rounded'/>
        <h2 className='text-xl font-bold mt-4'>
        Create phone screening call
        </h2>
        <p className='text-gray-500'>Schedule phone screening call with candidates.</p>
      </div>
    </div>
  )
}

export default DashboardScheduleInterviewOptions