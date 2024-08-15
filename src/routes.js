import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Appointment from "views/Appointment.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Crudmode from "views/Crudmode.js";
import Crudcentre from "views/Crudcentre";

 const dashboardRoutes = [
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-alien-33",
    component: Upgrade,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
    subRoutes: [
      {
        path: "/crudmode",
        name: "CRUD Modérateur",
        component: Crudmode, 
        layout: "/admin",
      },
      {
        path: "/crudcentre",
        name: "CRUD Centre",
        component: Crudcentre, 
        layout: "/admin",
      },
    ],
  },
  {
    path: "/appointment",
    name: "Appointment",
    icon: "nc-icon nc-time-alarm", // Nouvelle icône pour Appointment
    component: Appointment,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  }
];

export default dashboardRoutes;
