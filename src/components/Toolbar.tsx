import React, {useState} from 'react';
import styled from 'styled-components';
import CalendarIcon from '../assets/images/calendar.png';
import GroupsIcon from '../assets/images/groups.png';
import CartIcon from '../assets/images/cart.png'

const ToolbarContainer = styled.div`
    width: 100%;
    height: 115px;
    background:#ff5151;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    z-index:1000;
    bottom: 0;
    left: 0;
`;

const IconWrapper = styled.div<{ active: boolean }>`
  cursor: pointer;
  opacity: ${(props) => (props.active ? 1.0 : 0.5)};
  &:hover {
    opacity: ${(props) => (props.active ? 1.0 : 0.7)};
  }
`;
const IconImage = styled.img`
    width: 43px;
    height: 42px;
`;

const Toolbar: React.FC = () => {
    const [activeIcon, setActiveIcon] = useState<string>('calendar')
return (
    <ToolbarContainer>
    <IconWrapper active={activeIcon==='groups'} onClick={() => setActiveIcon('groups')}>
        <IconImage src={GroupsIcon} alt="Groups"/> {/* 커뮤니티 아이콘 */}
    </IconWrapper>
    <IconWrapper active={activeIcon==='calendar'} onClick={()=>setActiveIcon('calendar')}>
        <IconImage src={CalendarIcon} alt="Calendar"/> {/* 캘린더 아이콘 */}
    </IconWrapper>
    <IconWrapper active={activeIcon==='Cart'} onClick={()=>setActiveIcon('cart')}>
        <IconImage src={CartIcon} alt="Cart"/> {/* 쇼핑 아이콘 */}
    </IconWrapper>
    </ToolbarContainer>
    );
};

export default Toolbar;
