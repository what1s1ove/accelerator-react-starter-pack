import { useState } from 'react';

export const useTabs = (initialTab: string) => {
  const [selectedTab, setSelectedTab] = useState(initialTab);

  const onTabClickHandler = (item: string) => setSelectedTab(item);

  return [
    selectedTab,
    onTabClickHandler,
  ] as const;
};
