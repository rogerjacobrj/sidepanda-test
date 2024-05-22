import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'react-calendar/dist/Calendar.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/home';
import ContactUs from './pages/contact-us';
import AboutUs from './pages/about-us';
import Leadership from './pages/leadership';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home
  },
  {
    path: "/contact-us",
    Component: ContactUs
  },
  {
    path: "/about-us",
    Component: AboutUs
  },
  {
    path: "/leadership",
    Component: Leadership
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
