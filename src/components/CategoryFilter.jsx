export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="category-scroll" aria-label="Filter movies by genre">
      {categories.map((category) => (
        <button
          key={category.name}
          type="button"
          className={`category-chip${selected === category.id ? ' selected' : ''}`}
          aria-pressed={selected === category.id}
          onClick={() => onSelect(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
