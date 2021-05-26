import React, { useState, useCallback, memo } from 'react';
import { styled } from 'linaria/react';

import { mainImageWebp, mainImageJpg, github, gitlab, gmail } from './imgs';

export const Header = memo(() => {
  const [mainImage, setMainImage] = useState(mainImageWebp);

  const handleErrorMainImg = useCallback(() => {
    setMainImage(mainImageJpg);
  }, []);

  const handleOnClick = useCallback(
    (url) => () => {
      window.open(url, '_blank ');
    },
    [],
  );

  const handleOnEmail = useCallback(
    (email) => () => {
      window.location = `mailto:${email}`;
    },
    [],
  );

  return (
    <Block1>
      <MainImg
        src={mainImage}
        onError={handleErrorMainImg}
        alt="my-main-picture"
      />

      <TextWrapper>
        <Title>Nikita Chernyshov</Title>
        <Description>
          Software Engineer / Web Developer / Data Scientist
        </Description>
      </TextWrapper>

      <SocialWrapper>
        <Box>
          <Img
            onClick={handleOnClick('https://github.com/xxrom')}
            src={github}
            alt="github icon"
          />
        </Box>
        <Box>
          <Img
            onClick={handleOnClick('https://gitlab.com/xromm')}
            src={gitlab}
            alt="gitlab icon"
          />
        </Box>
        <Box>
          <Img
            onClick={handleOnEmail('chernyshovnm@gmail.com')}
            src={gmail}
            alt="gmail icon"
          />
        </Box>
      </SocialWrapper>
    </Block1>
  );
});

Header.displayName = 'Header';

const Block1 = styled.div`
  position: relative;
  display: flex;
  height: 100vh;
  width: 100vw;
  min-height: 500px;

  overflow: hidden;

  justify-content: center;
  align-items: center;

  font-family: 'Oswald', 'Raleway', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
`;

const MainImg = styled.img`
  position: absolute;
  top: 0;
  min-height: 100%;
  min-width: 100vw;
  z-index: -1;
`;

const TextWrapper = styled.div`
  display: flex;
  position: absolute;

  height: 100%;
  width: 100vw;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  color: white;

  font-weight: 100;

  background-color: rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    & {
      justify-content: flex-start;
    }
  }
`;

const Title = styled.h1`
  /* minFont + (MaxFont - MinFont) * (100VW - minSize) / (maxSize - minSize) */
  font-size: calc(24px + (72 - 24) * (100vw - 400px) / (1600 - 400));

  letter-spacing: 0.6rem;

  text-transform: uppercase;
  font-weight: 100;

  @media (max-width: 768px) {
    padding-top: 6rem;
  }
`;

const Description = styled.p`
  font-size: calc(16px + (20 - 16) * (100vw - 400px) / (1600 - 400));
  letter-spacing: 0.1rem;
`;

const SocialWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    position: absolute;
    display: flex;

    bottom: 0;

    justify-content: center;
    align-items: flex-end;

    padding-bottom: 4rem;
  }
`;

const Box = styled.div`
  @media (max-width: 768px) {
    cursor: pointer;
    margin: 0 0.5rem;
    }
  }
`;

const Img = styled.img`
  @media (max-width: 768px) {
    height: 2em;
  }
`;
