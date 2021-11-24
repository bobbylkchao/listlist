/**
 * @jest-environment jsdom
 */
 import React from 'react';
 import { render, screen } from '@testing-library/react';
 import MainEntry from '../pages/index';
 
 describe('IndexPage', () => {
   it('Index page test is running...', () => {
     render(<MainEntry />);
 
     const heading = screen.getByRole('heading', {
       name: /Home/i,
     });
 
     expect(heading).toBeInTheDocument();
   })
 });
