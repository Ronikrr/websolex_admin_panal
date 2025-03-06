
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/ui/breadcrumb';
import { IoMdAdd } from 'react-icons/io';
import Input from '../../components/ui/input';
import FeedbackMessage from '../../components/ui/feedback';
import { fetchdailyHistory, addwork } from '../../Redux/slice/workadd';
import { useDispatch, useSelector } from 'react-redux';
import Seconduray from '../../components/ui/seconduray';
import Primary from '../../components/ui/primary';

const Workadd = () => {
  const dispatch = useDispatch();
  const UserId = useSelector((state) => state.auth.user?.user?.id);
  const email = useSelector((state) => state.auth.user?.user?.email);
  const allhistory = useSelector(state => state.workLog.dailyHistory);
  const error = useSelector(state => state.workLog.feedback);
  

  const [isOpenAddModel, setIsOpenAddModel] = useState(false);
  const [formdata, setFormData] = useState({
    projectName: "",
    work: "",
    startTime: "",
    endTime: "",
    totalHours: ""
  });
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    if (error) {
    console.log(error)
    }
  }, [error]);
  useEffect(() => {
    if (UserId) {
      dispatch(fetchdailyHistory({ userId: UserId }));
    }
  }, [dispatch, UserId]);

  const resetFormFields = () => {
    setFormData({
      projectName: "",
      work: "",
      startTime: "",
      endTime: "",
      totalHours: ""
    });
  };

  const handleClear = () => {
    setFeedback({ message: "", type: "" });
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const calculateTotalHours = (start, end) => {
    if (!start || !end) return "0.00";

    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);

    const startDate = new Date(2000, 0, 1, startHours, startMinutes);  // Fixed date for both to avoid date drift
    const endDate = new Date(2000, 0, 1, endHours, endMinutes);

    if (endDate < startDate) return "0.00";  // Handles invalid time range

    const diffMs = endDate - startDate;
    return (diffMs / (1000 * 60 * 60)).toFixed(2); // Convert to hours
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "startTime" || name === "endTime") {
        updated.totalHours = calculateTotalHours(updated.startTime, updated.endTime);
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workData = {
      userId: UserId,
      email,
      projectName: formdata.projectName,
      work: formdata.work,
      startTime: formdata.startTime,
      endTime: formdata.endTime,
      totalHours: formdata.totalHours,  // Corrected to use formdata.totalHours
      date: getCurrentDate()            // Using helper function for date
    };

    const result = await dispatch(addwork(workData)).unwrap();
    if (result) {
      resetFormFields()
      setIsOpenAddModel(false)
    }

  };

  const recentLead = allhistory.length > 0 ? allhistory[allhistory.length - 1] : null;

  return (
    <div className="w-full bg-gray-100 2xl:p-10 2xl:pb-0 md:p-6">
      <div className='w-full'>
        {feedback.message && (
          <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
        )}

        <div className="flex items-center justify-between mb-4">
          <h1 className='capitalize text-[26px] font-semibold'>User Work Logs</h1>
          <Breadcrumb />
        </div>

        <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
          <div className="flex items-center justify-between w-full">
            <h2 className="capitalize text-[22px] font-semibold">Most Recent Work Logs</h2>
            <button
              className="flex items-center gap-3 rounded-lg px-6 py-2 shadow-md border text-[var(--primary-color)] border-[var(--primary-color)] uppercase hover:bg-[var(--primary-color)] hover:text-white duration-1000"
              title="Add Work Log"
              onClick={() => setIsOpenAddModel(true)}
            >
              <IoMdAdd /> Add
            </button>
          </div>

          <table className="w-full mt-5 border border-collapse border-gray-200">
            <thead className="bg-gray-100 text-gray-600 text-[12px] md:text-[16px] uppercase leading-[1.5]">
              <tr>
                <th className="p-2.5 xl:p-4 border border-gray-200">projectName</th>
                <th className="p-2.5 xl:p-4 border border-gray-200">Work</th>
                <th className="p-2.5 xl:p-4 border border-gray-200">email</th>
                <th className="p-2.5 xl:p-4 border border-gray-200">start time</th>
                <th className="p-2.5 xl:p-4 border border-gray-200">end</th>
                <th className="p-2.5 xl:p-4 border border-gray-200">total hours</th>
                <th className="p-2.5 xl:p-4 border border-gray-200">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentLead ? (

                <tr key={recentLead?.id} className="border-b border-gray-200">
                  <td className="p-2.5 xl:p-4 border border-gray-200 text-center">{recentLead?.projectName}</td>
                  <td className="p-2.5 xl:p-4 border border-gray-200">{recentLead?.work}</td>
                  <td className="p-2.5 xl:p-4 border border-gray-200">{recentLead?.email}</td>
                  <td className="p-2.5 xl:p-4 border border-gray-200">{recentLead?.startTime}</td>
                  <td className="p-2.5 xl:p-4 border border-gray-200">{recentLead?.endTime}</td>
                  <td className="p-2.5 xl:p-4 border border-gray-200">{recentLead?.totalHours}</td>
                  <td className="p-2.5 xl:p-4 border border-gray-200">{recentLead?.date}</td>
                </tr>

              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center">No leads found.</td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full p-5 bg-white rounded-md shadow-md">
        <h1 className="capitalize text-[15px] lg:text-[26px] py-6 font-semibold">All added</h1>

        <div className="overflow-x-auto ">
          <table className="w-full mt-5 border border-collapse border-gray-200">
            <thead className="bg-gray-100 text-gray-600 text-[12px] md:text-[16px] uppercase leading-[1.5]">
              <tr>
                <th className="p-2.5 xl:p-4 border border-gray-200">projectName</th>
                <th className="p-2.5 xl:p-4 border border-gray-200">Work</th>
                <th className="p-2.5 xl:p-4 border border-gray-200">email</th>
                <th className="p-2.5 xl:p-4 border border-gray-200">start time</th>
                <th className="p-2.5 xl:p-4 border border-gray-200">end</th>
                <th className="p-2.5 xl:p-4 border border-gray-200">total hours</th>
                <th className="p-2.5 xl:p-4 border border-gray-200">Date</th>
              </tr>
            </thead>
            <tbody>
              {allhistory?.length > 0 ? (
                allhistory.map((log, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-2.5 xl:p-4 border border-gray-200 text-center">{log.projectName}</td>
                    <td className="p-2.5 xl:p-4 border border-gray-200">{log.work}</td><td className="p-2.5 xl:p-4 border border-gray-200">{log.email}</td>
                    <td className="p-2.5 xl:p-4 border border-gray-200">{log.startTime}</td>
                    <td className="p-2.5 xl:p-4 border border-gray-200">{log.endTime}</td>
                    <td className="p-2.5 xl:p-4 border border-gray-200">{log.totalHours}</td>
                    <td className="p-2.5 xl:p-4 border border-gray-200">{log.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center">No leads found.</td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      {isOpenAddModel && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="w-full p-5 bg-white rounded-md shadow-md md:p-8 md:w-2/3 2xl:w-1/3">
            <h1 className="capitalize text-[26px] font-semibold mb-4">Add Work Log</h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col w-full gap-5 item-center lg:flex-row">
                <div className="w-full mb-4 lg:w-6/12">
                  <label className='mb-2.5 block font-medium text-black capitalize'>project name</label>
                  <div className="relative">
                    <Input
                      type="text"
                      name="projectName"
                      value={formdata.projectName}
                      onChange={handleOnChange}
                      placeholder="Enter your work projectName"
                      required
                    />
                  </div>
                </div>
                <div className="w-full mb-4 lg:w-6/12">
                  <label className='mb-2.5 block font-medium text-black capitalize'>Work</label>
                  <div className="relative">
                    <Input
                      type="text"
                      name="work"
                      value={formdata.work}
                      onChange={handleOnChange}
                      placeholder="Enter your work "
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-5 item-center lg:flex-row">
                <div className="w-full mb-4 lg:w-6/12">
                  <label className='mb-2.5 block font-medium text-black capitalize'>start time</label>
                  <div className="relative">
                    <Input
                      type="time"
                      name="startTime"
                      value={formdata.startTime}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                </div>
                <div className="w-full mb-4 lg:w-6/12">
                  <label className='mb-2.5 block font-medium text-black capitalize'>end time</label>
                  <div className="relative">
                    <Input
                      type="time"
                      name="endTime"
                      value={formdata.endTime}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className='mb-2.5 block font-medium text-black capitalize'>total time</label>
                <div className="relative">
                  <Input
                    type="text"
                    name="totalHours"
                    value={formdata.totalHours}
                    disabled
                  />

                </div>
              </div>
              <div className="flex justify-between mb-5">
                <Primary label="Add Work Log" />
                <Seconduray
                  type="button"
                  label={"Cancel"}
                  onClick={() => {
                    resetFormFields();
                    setIsOpenAddModel(false);
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workadd;
