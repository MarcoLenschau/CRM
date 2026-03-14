import { ReactNode } from 'react';

export interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'cyan' | 'pink' | 'indigo';
}
