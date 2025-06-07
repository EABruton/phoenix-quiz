import './Searchbar.css';


type SearchbarProps = {
  ariaControls: string;
  ariaLabel: string;
  searchCallback: (arg: string) => void;
}

export default function Searchbar({ ariaControls, ariaLabel, searchCallback }: SearchbarProps) {
  return (
    <div role="search" aria-label={ariaLabel} className="searchbar">
      <input
      className="searchbar__input"
      type="text"
      placeholder="Search questions..."
      aria-controls={ariaControls}
      onChange={(e) => searchCallback(e.target.value)}
      />
    </div>
  );
}

