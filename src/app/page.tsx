"use client";

import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Categories from '../components/home/Categories';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Newsletter from '../components/home/Newsletter';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <Categories />
      <WhyChooseUs />
      <Newsletter />
    </main>
  );
}