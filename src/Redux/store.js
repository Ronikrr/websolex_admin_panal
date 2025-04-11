import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import blogReducer from './slice/blogslice'
import testimonalapiSlice from './slice/testimonalapiSlice'
import socialReducer from './slice/socialslice'
import contactReducer from './slice/contactslice'
import contactfromreducer from './slice/contactDetailSlice'
import ourworkreducer from './slice/lastworkslice'
import projectreducer from './slice/projectSlice'
import teammemberreducer from "./slice/teamslice"
import ValuedClientreducer from './slice/valuedclientslice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        blogs: blogReducer,
        clientrate: testimonalapiSlice,
        social: socialReducer,
        contact: contactReducer,
        contactfrom: contactfromreducer,
        ourwork: ourworkreducer,
        project: projectreducer,
        teamMember: teammemberreducer,
        valuedclient: ValuedClientreducer,
      
    }
})
export default store