'use client';
import { useState, useEffect } from 'react';
import QUOTES from '@/data/quotes.json';

export default function RandomQuote() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  return <div>{quote}</div>;
}
