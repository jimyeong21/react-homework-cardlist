import { VillaItem } from '@/types/villa';
import { tm } from '@/utils/tw-merge';
import { Heart, HeartSolid } from '@mynaui/icons-react';

interface CardProps {
  item: VillaItem;
  onUpdate: (item: VillaItem, isFavorited: boolean) => void;
}

function Card({ item, onUpdate }: CardProps) {
  const isFavorited = item.isFavorited;

  const handleChangeFavorite = () => {
    const nextIsFavorited = !isFavorited;
    onUpdate(item, nextIsFavorited);
  };

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log(slug);
  };

  const iconSize = 20;
  const slug = `/villa-list/${item.id}`;
  const buttonLabel = `즐겨찾기 ${isFavorited ? '제거' : '추가'}`;
  const Icon = isFavorited ? HeartSolid : Heart;

  return (
    <li className={tm('relative')}>
      <a href={slug} onClick={handleLink}>
        <figure>
          <img
            className={tm('w-full h-80 object-cover rounded-lg')}
            src={item.image}
            alt={item.title}
          />
        </figure>
        <h3 className={tm('text-lg font-medium mt-2')}>{item.title}</h3>
        <p className={tm('text-base text-gray-500')}>{item.description}</p>
      </a>
      <button
        type="button"
        title={buttonLabel}
        aria-label={buttonLabel}
        className={tm(
          'absolute top-5 right-5',
          'w-10 h-10',
          'rounded-full bg-white',
          'border-gray-300 border-1',
          'cursor-pointer'
        )}
        onClick={handleChangeFavorite}
      >
        <Icon size={iconSize} className={tm('m-auto')} />
      </button>
      <ul className={tm('flex gap-2 mt-1')}>
        {item.tags.map((tags, index) => (
          <li
            key={index}
            className={tm(
              'px-1.5 py-0.5',
              'rounded-sm border-1 border-gray-300',
              'text-sm text-gray-600'
            )}
          >
            {tags}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default Card;
