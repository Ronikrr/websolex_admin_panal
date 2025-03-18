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
