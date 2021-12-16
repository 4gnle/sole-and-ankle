import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant === 'on-sale' && <SaleFlag>Sale</SaleFlag>}
          {variant === 'new-release' && <NewFlag>Just Released</NewFlag>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice>{salePrice ? formatPrice(salePrice) : null}</SalePrice>

        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;

`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;

`;

const ImageWrapper = styled.div`
  object-position:50% 50%;
  object-fit:cover;
  border-radius: 16px 16px 4px 4px;
`;

const Image = styled.img`
  width: 100%;

`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;

`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  margin-right: auto;
`;

const Price = styled.span`
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
  margin-right: auto;
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.span`
  display: absolute;
  top: 0;
  right: 0;
  height: 32px;
  color: white;
  font-size: 14px;
  border-radius: 2px;
  padding: 0 10px;
  line-height: 32px;
`;

const NewFlag = styled(Flag)`
  background-color: ${COLORS.primary};
`;

const SaleFlag = styled(Flag)`
  background-color: ${COLORS.secondary};
`;

export default ShoeCard;
