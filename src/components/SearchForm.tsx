import { Ref, useId, useRef, useState } from 'react';
import { tm } from '@/utils/tw-merge';
import { deleteQueryParam, setQueryParam } from '@/utils/query-param';

// 브라우저에서 쿼리 스트링(문자값) 디코딩하여 가져오는 함수
const getQueryString = () => decodeURIComponent(location.search);

// string으로 구성된 배열을 문자 값으로 변환하는 함수
const convertQueryString = (queryArray: string[]) =>
  queryArray.filter(Boolean).join(' ').trim();

interface SearchFormProps {
  query: string;
  ref?: Ref<{ focus: () => void; select: () => void; remove: () => void }>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

function SearchForm({ query, setQuery }: SearchFormProps) {
  const [queryString, setQueryString] = useState(getQueryString);
  const searchInputId = useId();

  // [파생된 상태]
  const words = query
    .split(' ')
    .filter(Boolean)
    .map((word) => word.toLowerCase().trim());

  // [이벤트 핸들러]
  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleSearch = () => {
    if (words.length > 0) {
      setQueryParam(convertQueryString(words));
      setQueryString(getQueryString);
    } else {
      deleteQueryParam();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <output className="hidden">{queryString}</output>
      <form action={handleSearch}>
        <label htmlFor={searchInputId} className={tm('block mb-1.5 text-lg')}>
          Search
        </label>
        <div className={tm('flex gap-1 relative w-sm')}>
          <input
            ref={inputRef}
            type="search"
            name="query"
            id={searchInputId}
            value={query}
            onChange={handleQuery}
            className={tm(
              'py-2 px-3 w-full',
              'rounded-md border-1 border-gray-300',
              'text-gray-700'
            )}
            placeholder="Ex.서울"
          />
          <button
            type="submit"
            className={tm('absolute cursor-pointer right-3 top-2 bg-white')}
          >
            <img
              src="https://unpkg.com/@mynaui/icons/icons/search.svg"
              alt="검색"
            />
          </button>
        </div>
      </form>
    </>
  );
}

export default SearchForm;
