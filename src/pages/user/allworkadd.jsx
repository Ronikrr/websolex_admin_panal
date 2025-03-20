import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/ui/breadcrumb';
import FeedbackMessage from '../../components/ui/feedback';
import { fetchAllDayHistory } from '../../Redux/slice/workadd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AllWorkadd = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const allhistory = useSelector((state) => state.workLog.allhistory);
  const error = useSelector((state) => state.workLog.feedback);

  const [feedback, setFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    // ✅ Redirect if user is not an admin
    if (user?.role === 'user' || user?.role === 'employee') {
      navigate('/unauthorized');
      return;
    }


  }, [user, navigate]);
  useEffect(() => {
    if (error) {
      setFeedback({ message: error.message, type: error.type });
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchAllDayHistory());
  }, [dispatch]);

  const handleClear = () => {
    setFeedback({ message: '', type: '' });
  };

  return (
    <div className="bg-gray-50 p-6 w-full md:p-8 min-h-[90vh]">
      {/* Feedback Message */}
      {feedback.message && (
        <div className="mb-4">
          <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-gray-800 font-semibold">Daily Work Updates</h1>
        <Breadcrumb />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 sm:grid-cols-2">
        {allhistory?.length > 0 ? (
          allhistory.map((log, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-gray-700 text-lg font-semibold">{log.projectName}</h2>
                <span className="text-gray-500 text-xs">{log.date}</span>
              </div>
              <div className="text-gray-600 text-sm">
                <p><strong>Work:</strong> {log.work}</p>
                <p><strong>Email:</strong> {log.email}</p>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
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
