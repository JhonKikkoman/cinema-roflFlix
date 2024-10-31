import React from 'react';

import { iconComponent } from '../constant';

export function Icon({ iconName }: { iconName: string }) {
  const IconComponent = iconComponent[iconName as keyof typeof iconComponent];
  return <IconComponent />;
}
