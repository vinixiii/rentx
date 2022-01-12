import React from 'react';

import {
  Container
} from './styles';

interface IBulletProps {
  active?: boolean;
}

export function Bullet({ active = false } : IBulletProps) {
  return(
    <Container active={active} />
  );
};
