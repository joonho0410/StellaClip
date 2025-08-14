import React, { useState } from 'react';
import { cn } from '@/shared/lib/component-classes';
import { Button } from '../button';

export interface SubTab {
  id: string;
  label: string;
  count?: number;
}

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  subTabs?: SubTab[];
}

export interface CategoryBarProps {
  tabs: Tab[];
  activeTabId?: string;
  activeSubTabId?: string;
  onTabChange?: (tabId: string) => void;
  onSubTabChange?: (tabId: string, subTabId: string) => void;
  className?: string;
  showSubTabs?: boolean;
}

export function CategoryBar({
  tabs,
  activeTabId,
  activeSubTabId,
  onTabChange,
  onSubTabChange,
  className,
  showSubTabs = true,
}: CategoryBarProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(
    activeTabId || tabs[0]?.id || ''
  );
  const [internalActiveSubTab, setInternalActiveSubTab] = useState(
    activeSubTabId || ''
  );

  const currentActiveTab = activeTabId || internalActiveTab;
  const currentActiveSubTab = activeSubTabId || internalActiveSubTab;

  const handleTabClick = (tabId: string) => {
    if (!activeTabId) {
      setInternalActiveTab(tabId);
    }

    const tab = tabs.find((t) => t.id === tabId);
    if (tab?.subTabs && tab.subTabs.length > 0) {
      const firstSubTabId = tab.subTabs[0].id;
      if (!activeSubTabId) {
        setInternalActiveSubTab(firstSubTabId);
      }
      onSubTabChange?.(tabId, currentActiveSubTab || firstSubTabId);
    } else {
      if (!activeSubTabId) {
        setInternalActiveSubTab('');
      }
    }

    onTabChange?.(tabId);
  };

  const handleSubTabClick = (subTabId: string) => {
    if (!activeSubTabId) {
      setInternalActiveSubTab(subTabId);
    }
    onSubTabChange?.(currentActiveTab, subTabId);
  };

  const activeTab = tabs.find((tab) => tab.id === currentActiveTab);
  const hasSubTabs =
    showSubTabs && activeTab?.subTabs && activeTab.subTabs.length > 0;

  return (
    <div className={cn('w-full', className)}>
      {/* Main Tabs */}
      <div className="border-b border-[var(--salt-color-border-subtle)]">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto pb-0 scrollbar-hide">
            {tabs.map((tab) => {
              const isActive = currentActiveTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap flex-shrink-0 cursor-pointer',
                    'border-b-2 transition-all duration-200 ease-out',
                    'hover:text-[var(--salt-color-text-primary)]',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--salt-color-focus)]',
                    isActive
                      ? [
                          'text-[var(--salt-color-interactive)]',
                          'border-[var(--salt-color-interactive)]',
                        ]
                      : [
                          'text-[var(--salt-color-text-secondary)]',
                          'border-transparent',
                          'hover:border-[var(--salt-color-border-subtle-selected)]',
                        ]
                  )}
                >
                  {tab.icon && (
                    <span className="text-base" aria-hidden="true">
                      {tab.icon}
                    </span>
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      {hasSubTabs && (
        <div className="bg-[var(--salt-color-layer-01)] border-b border-[var(--salt-color-border-subtle)]">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
              {activeTab.subTabs!.map((subTab) => {
                const isActive = currentActiveSubTab === subTab.id;

                return (
                  <Button
                    key={subTab.id}
                    variant={isActive ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => handleSubTabClick(subTab.id)}
                    className="flex-shrink-0"
                  >
                    <span>{subTab.label}</span>
                    {subTab.count !== undefined && (
                      <span
                        className={cn(
                          'ml-1.5 px-1.5 py-0.5 text-xs rounded-full',
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[var(--salt-color-background-secondary)] text-[var(--salt-color-text-tertiary)]'
                        )}
                      >
                        {subTab.count}
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
