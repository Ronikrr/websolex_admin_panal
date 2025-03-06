// import React, { useEffect, useState } from 'react';
// import Breadcrumb from '../../components/ui/breadcrumb';
// import FeedbackMessage from '../../components/ui/feedback';
// import { fetchAllDayHistory } from '../../Redux/slice/workadd';
// import { useDispatch, useSelector } from 'react-redux';

// const AllWorkadd = () => {
//   const dispatch = useDispatch();
  
//   const allhistory = useSelector(state => state.workLog.allhistory);
//   const error = useSelector(state => state.workLog.feedback);
//   console.log(allhistory)
 
//   const [feedback, setFeedback] = useState({ message: '', type: '' });

//   useEffect(() => {
//     if (error) {
//       console.log(error)
//       setFeedback({message:error, type:"error"})
//     }
//   }, [error]);
//   useEffect(() => {
    
//     dispatch(fetchAllDayHistory());
    
//   }, [dispatch]);



//   const handleClear = () => {
//     setFeedback({ message: "", type: "" });
//   };

  

//   return (
//     <div className="w-full bg-gray-100 2xl:p-10 2xl:pb-0 md:p-6">
//       <div className='w-full'>
//         {feedback.message && (
//           <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
//         )}

//         <div className="flex items-center justify-between mb-4">
//           <h1 className='capitalize text-[26px] font-semibold'>User Work Logs</h1>
//           <Breadcrumb />
//         </div>

//         <div className="w-full p-5 bg-white rounded-md shadow-md">
//           <h1 className="capitalize text-[15px] lg:text-[26px] py-6 font-semibold">All added</h1>

//           <div className="overflow-x-auto ">
//             <table className="w-full mt-5 border border-collapse border-gray-200">
//               <thead className="bg-gray-100 text-gray-600 text-[12px] md:text-[16px] uppercase leading-[1.5]">
//                 <tr>
//                   <th className="p-2.5 xl:p-4 border border-gray-200">projectName</th>
//                   <th className="p-2.5 xl:p-4 border border-gray-200">Work</th>
//                   <th className="p-2.5 xl:p-4 border border-gray-200">email</th>
//                   <th className="p-2.5 xl:p-4 border border-gray-200">start time</th>
//                   <th className="p-2.5 xl:p-4 border border-gray-200">end</th>
//                   <th className="p-2.5 xl:p-4 border border-gray-200">total hours</th>
//                   <th className="p-2.5 xl:p-4 border border-gray-200">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {allhistory?.length > 0 ? (
//                   allhistory.map((log, index) => (
//                     <tr key={index} className="border-b border-gray-200">
//                       <td className="p-2.5 xl:p-4 border border-gray-200 text-center">{log.projectName}</td>
//                       <td className="p-2.5 xl:p-4 border border-gray-200">{log.work}</td><td className="p-2.5 xl:p-4 border border-gray-200">{log.email}</td>
//                       <td className="p-2.5 xl:p-4 border border-gray-200">{log.startTime}</td>
//                       <td className="p-2.5 xl:p-4 border border-gray-200">{log.endTime}</td>
//                       <td className="p-2.5 xl:p-4 border border-gray-200">{log.totalHours}</td>
//                       <td className="p-2.5 xl:p-4 border border-gray-200">{log.date}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="p-4 text-center">No leads found.</td>
//                   </tr>
//                 )}

//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
      

      
//     </div>
//   );
// };

// export default AllWorkadd;
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/ui/breadcrumb';
import FeedbackMessage from '../../components/ui/feedback';
import { fetchAllDayHistory } from '../../Redux/slice/workadd';
import { useDispatch, useSelector } from 'react-redux';

const AllWorkadd = () => {
  const dispatch = useDispatch();
  const allhistory = useSelector((state) => state.workLog.allhistory);
  const error = useSelector((state) => state.workLog.feedback);

  const [feedback, setFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    if (error) {
      setFeedback({ message: error, type: 'error' });
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchAllDayHistory());
  }, [dispatch]);

  const handleClear = () => {
    setFeedback({ message: '', type: '' });
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50 md:p-8">
      {/* Feedback Message */}
      {feedback.message && (
        <div className="mb-4">
          <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
        </div>
      )}

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Daily Work Updates</h1>
        <Breadcrumb />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {allhistory?.length > 0 ? (
          allhistory.map((log, index) => (
            <div key={index} className="p-5 space-y-4 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-700">{log.projectName}</h2>
                <span className="text-xs text-gray-500">{log.date}</span>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Work:</strong> {log.work}</p>
                <p><strong>Email:</strong> {log.email}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <div>
                  <p><strong>Start:</strong> {log.startTime}</p>
                  <p><strong>End:</strong> {log.endTime}</p>
                </div>
                <div className="text-right">
                  <p><strong>Total Hours:</strong> {log.totalHours}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 p-6 text-center text-gray-500">
            No work logs found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllWorkadd;
