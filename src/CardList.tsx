import { useEffect, useRef, useState } from 'react';
import { VillaItem } from './types/villa';
import { tm } from './utils/tw-merge';
import { getQueryParam } from './utils/query-param';
import villaList from './data/data';
import SearchedList from './components/SearchedList';
import SearchForm from './components/SearchForm';

const getQueryState = () => getQueryParam() ?? '';

function CardList() {
  const [list, setList] = useState<VillaItem[]>(villaList);

  const handleUpdateList = (item: VillaItem, isFavorited: boolean) => {
    setList(
      list.map((it) => (it.id === item.id ? { ...it, isFavorited } : it))
    );
  };

  const [query, setQuery] = useState(getQueryState);

  useEffect(() => {
    const handlePopState = () => {
      setQuery(getQueryState);
    };

    globalThis.addEventListener('popstate', handlePopState);

    return () => {
      globalThis.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const sharedImperativeHandlesRef = useRef<{
    focus: () => void;
    select: () => void;
    remove: () => void;
  }>(null);

  useEffect(() => {
    console.log('effect callback: use effect');
    const clearId = setTimeout(() => {
      const handles = sharedImperativeHandlesRef.current;
      if (handles) {
        handles.select();
      }
    }, 900);

    return () => {
      clearTimeout(clearId);
    };
  });

  return (
    <main className={tm('m-10 p-8 rounded-t-xl bg-white')}>
      <h1 className="sr-only">숙소 검색 리스트</h1>
      <SearchForm
        ref={sharedImperativeHandlesRef}
        query={query}
        setQuery={setQuery}
      />
      <SearchedList list={list} query={query} onUpdate={handleUpdateList} />
    </main>
  );
}

export default CardList;
