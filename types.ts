import type { ReactElement } from 'react';

export interface NavItem {
  id: string;
  label: string;
  // Fix: Use ReactElement instead of JSX.Element and import it from 'react'.
  icon: ReactElement;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface Recipe {
  recipeName: string;
  ingredients: string[];
  instructions: string[];
}
