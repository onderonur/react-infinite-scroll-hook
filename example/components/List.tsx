import * as React from 'react';
import styled, { keyframes } from 'styled-components';

interface ListProps {
  direction?: 'vertical' | 'horizontal';
}

export const List = styled.ul<ListProps>`
  display: ${({ direction }) =>
    direction === 'horizontal' ? 'flex' : 'block'};
  list-style: none;
  font-size: 16px;
  margin: 0;
  padding: 6px;
`;

export const ListItem = styled.li`
  background-color: #fafafa;
  border: 1px solid #99b4c0;
  padding: 8px;
  margin: 4px;
`;

const gradientAnimation = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

const LoadingRoot = styled.div`
  animation: ${gradientAnimation} 2s linear infinite;
  background: linear-gradient(45deg, #298fee, #11c958, #a120bb, #d6612a);
  background-size: 600% 600%;
  color: #fff;
  padding: 8px;
`;

export function Loading() {
  return <LoadingRoot>Loading...</LoadingRoot>;
}
