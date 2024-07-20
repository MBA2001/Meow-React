import styled from '@emotion/styled';
import React from 'react';
import { Typography } from './Typography';
import logo from '../assets/logo1.png';

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;


  > div {
    width: 100%;
    overflow: hidden;
  }
`;

export const SidebarHeader = ({ children, rtl, ...rest }) => {
  return (
    <StyledSidebarHeader {...rest}>
      <div style={{ display: 'flex', alignItems: 'center', padding:50 }}>
        <img src={logo} style={{width:140, height:70}}/>
      </div>
    </StyledSidebarHeader>
  );
};