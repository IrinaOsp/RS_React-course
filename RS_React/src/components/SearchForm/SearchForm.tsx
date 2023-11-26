'use client';

import { useState } from 'react';
import ThrowErrorButton from '../ThrowErrorButton';
import styles from './SearchForm.module.css';
import { useRouter } from 'next/router';

export function SearchForm() {
  const [inputText, setInputText] = useState<string>('');
  const router = useRouter();
  const urlSearchQuery = router.query.search || '';

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push(`/?search=${inputText}`);
  };

  return (
    <form className={styles.searchForm} title="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Enter text"
        value={inputText || urlSearchQuery}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button type="submit">Search</button>
      <ThrowErrorButton />
    </form>
  );
}
