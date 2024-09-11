import React from 'react';

interface SearchPageProps {
  searchParams: {
    query: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const searchData = searchParams.query;
  return (
    <h1>{searchData}</h1>
  );
}
