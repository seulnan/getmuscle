import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import CalendarIcon from "../assets/images/calendar.png";
import GroupsIcon from "../assets/images/groups.png";
import CartIcon from "../assets/images/cart.png";

const ToolbarContainer = styled.div`
  width: 100%;
  height: 115px;
  background: #ff5151;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const IconWrapper = styled.div<{ active: boolean }>`
  cursor: pointer;
  opacity: ${(props) => (props.active ? 1.0 : 0.5)};
  &:hover {
    opacity: 0.7;
  }
`;

const IconImage = styled.img`
  width: 43px;
  height: 42px;
`;

const Toolbar: React.FC = () => {
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState<string>("/");

  useEffect(() => {
    if (location.pathname.startsWith("/groups")) {
      setActiveIcon("/groups");
    } else if (location.pathname.startsWith("/calendar")) {
      setActiveIcon("/calendar");
    } else if (location.pathname.startsWith("/shopping")) {
      setActiveIcon("/shopping");
    }
  }, [location.pathname]);

  const handleIconClick = (path: string) => {
    setActiveIcon(path);
  };

  return (
    <ToolbarContainer>
        <Link to="/groups" onClick={() => handleIconClick("/groups")}>
        <IconWrapper active={activeIcon === "/groups"}>
          <IconImage src={GroupsIcon} alt="Groups" />
        </IconWrapper>
      </Link>
      <Link to="/calendar" onClick={() => handleIconClick("/calendar")}>
        <IconWrapper active={activeIcon === "/calendar"}>
          <IconImage src={CalendarIcon} alt="Calendar" />
        </IconWrapper>
      </Link>
      <Link to="/shopping" onClick={() => handleIconClick("/shopping")}>
        <IconWrapper active={activeIcon === "/shopping"}>
          <IconImage src={CartIcon} alt="Cart" />
        </IconWrapper>
      </Link>
    </ToolbarContainer>
  );
};

export default Toolbar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import styled from "styled-components";
// import CalendarIcon from "../assets/images/calendar.png";
// import GroupsIcon from "../assets/images/groups.png";
// import CartIcon from "../assets/images/cart.png";

// const ToolbarContainer = styled.div`
//   width: 100%;
//   height: 115px;
//   background: #ff5151;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   position: fixed;
//   bottom: 0;
//   left: 0;
// `;

// const IconWrapper = styled.div<{ active: boolean }>`
//   cursor: pointer;
//   opacity: ${(props) => (props.active ? 1.0 : 0.5)};
//   &:hover {
//     opacity: 0.7;
//   }
// `;

// const IconImage = styled.img`
//   width: 43px;
//   height: 42px;
// `;

// const Toolbar: React.FC = () => {
//   const location = useLocation();
//   const [activeIcon, setActiveIcon] = useState<string>("");

//   useEffect(() => {
//     const currentPath = location.pathname;
//     if (["/groups", "/calendar", "/shopping"].includes(currentPath)) {
//       setActiveIcon(currentPath);
//     }
//   }, [location.pathname]);

//   const handleIconClick = (path: string) => {
//     setActiveIcon(path);
//   };

//   return (
//     <ToolbarContainer>
//       <Link to="/groups" onClick={() => handleIconClick("/groups")}>
//         <IconWrapper active={activeIcon === "/groups"}>
//           <IconImage src={GroupsIcon} alt="Groups" />
//         </IconWrapper>
//       </Link>
//       <Link to="/calendar" onClick={() => handleIconClick("/calendar")}>
//         <IconWrapper active={activeIcon === "/calendar"}>
//           <IconImage src={CalendarIcon} alt="Calendar" />
//         </IconWrapper>
//       </Link>
//       <Link to="/shopping" onClick={() => handleIconClick("/shopping")}>
//         <IconWrapper active={activeIcon === "/shopping"}>
//           <IconImage src={CartIcon} alt="Cart" />
//         </IconWrapper>
//       </Link>
//     </ToolbarContainer>
//   );
// };

// export default Toolbar;
