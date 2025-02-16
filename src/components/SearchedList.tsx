import { tm } from '@/utils/tw-merge';
import { VillaItem } from '@/types/villa';
import Card from './Card';

interface SearchedListProps {
  query: string;
  list: VillaItem[];
  onUpdate: (item: VillaItem, isFavorited: boolean) => void;
}

function SearchedList({ list, query, onUpdate }: SearchedListProps) {
  const words = query
    .split(' ')
    .filter(Boolean)
    .map((word) => word.toLowerCase().trim());

  const filteredList = list.filter((item) => {
    return words.every((word) => {
      if (
        item.title.includes(word) ||
        item.description.includes(word) ||
        item.tags.some((tag) => tag.toLowerCase().includes(word))
      ) {
        return true;
      } else {
        return false;
      }
    });
  });

  const filteredCount = filteredList.length;
  const isEmpty = filteredCount === 0;

  return (
    <section>
      <h2 className="sr-only">검색된 리스트</h2>
      {isEmpty && (
        <p className={tm('py-5 mt-8', 'border-t-1 border-gray-300')}>
          &quot;{query}&quot; 일치하는 정보가 없습니다.
        </p>
      )}
      {!isEmpty && (
        <>
          <p className={tm('py-5 mt-8', 'border-t-1 border-gray-300')}>
            {filteredCount}개 검색됨
          </p>
          <ul className={tm('grid grid-cols-3 gap-x-7 gap-y-10')}>
            {filteredList.map((item) => (
              <Card key={item.id} item={item} onUpdate={onUpdate} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default SearchedList;
