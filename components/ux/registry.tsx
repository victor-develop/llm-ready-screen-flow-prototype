
import React from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import LandingPage from './LandingPage';
import ShoppingCartReview from './ShoppingCartReview';

export const UX_COMPONENTS: Record<string, React.ComponentType<any>> = {
  'login-form': LoginForm,
  'signup-form': SignupForm,
  'landing-page': LandingPage,
  'shopping-cart-review': ShoppingCartReview,
};

export const UX_COMPONENT_KEYS = Object.keys(UX_COMPONENTS);

export type UXComponentType = keyof typeof UX_COMPONENTS;
