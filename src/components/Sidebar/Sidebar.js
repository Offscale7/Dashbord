// import React, { Component } from "react";
// import { useLocation, NavLink } from "react-router-dom";

// import { Nav } from "react-bootstrap";

// function Sidebar({ color, image, routes }) {
//   const location = useLocation();
//   const activeRoute = (routeName) => {
//     return location.pathname.indexOf(routeName) > -1 ? "active" : "";
//   };
//   return (
//     <div className="sidebar" data-image={image} data-color={color}>
//       <div
//         className="sidebar-background"
//         style={{
//           backgroundImage: "url(" + image + ")"
//         }}
//       />
//       <div className="sidebar-wrapper">
//         <div className="logo d-flex align-items-center justify-content-start">
//           <a
//             href="https://www.creative-tim.com?ref=lbd-sidebar"
//             className="simple-text logo-mini mx-1"
//           >
//             <div className="logo-img">
//               <img src={require("assets/img/reactlogo.png")} alt="..." />
//             </div>
//           </a>
//           <a className="simple-text" href="http://www.creative-tim.com">
//             Tableau de bord
//           </a>
//         </div>
//         <Nav>
//           {routes.map((prop, key) => {
//             if (!prop.redirect)
//               return (
//                 <li
//                   className={
//                     prop.upgrade
//                       ? "active active-pro"
//                       : activeRoute(prop.layout + prop.path)
//                   }
//                   key={key}
//                 >
//                   <NavLink
//                     to={prop.layout + prop.path}
//                     className="nav-link"
//                     activeClassName="active"
//                   >
//                     <i className={prop.icon} />
//                     <p>{prop.name}</p>
//                   </NavLink>
//                 </li>
//               );
//             return null;
//           })}
//         </Nav>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav, Collapse } from "react-bootstrap"; 

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const [open, setOpen] = React.useState(false);

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img src={require("assets/img/reactlogo.png")} alt="..." />
            </div>
          </a>
          <a className="simple-text" href="http://www.creative-tim.com">
            Tableau de bord
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  {prop.subRoutes ? (
  <>
    <div onClick={toggleDropdown} className="nav-link">
      <i className={prop.icon} />
      <p>{prop.name}</p>
    </div>
    <Collapse in={open}>
      <div>
        {prop.subRoutes.map((subProp, subKey) => (
          <NavLink
            to={prop.layout + prop.path + subProp.path}
            className="nav-link"
            activeClassName="active"
            key={subKey}
          >
            <i className="nc-icon nc-minimal-right" />
            <p>{subProp.name}</p>
          </NavLink>
        ))}
      </div>
    </Collapse>
  </>
) : (
  <NavLink
    to={prop.layout + prop.path}
    className="nav-link"
    activeClassName="active"
  >
    <i className={prop.icon} />
    <p>{prop.name}</p>
  </NavLink>
)}
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
