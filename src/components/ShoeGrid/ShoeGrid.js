import React from 'react';
import styled from 'styled-components/macro';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';

const ShoeGrid = () => {
  return (
    <Wrapper>
      {SHOES.map((shoe) => (
        <OtherWrap key={shoe.slug}>
          <ShoeCard  {...shoe} />
        </OtherWrap>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 36px;
  flex-wrap: wrap;

`;

const OtherWrap = styled.div`
  min-width: 340px;
  flex: 1;
`;

export default ShoeGrid;
