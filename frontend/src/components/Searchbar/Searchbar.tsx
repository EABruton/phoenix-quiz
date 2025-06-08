import './Searchbar.css';


type SearchbarProps = {
  ariaControls: string;
  ariaLabel: string;
  searchCallback: (arg: string) => void;
  placeholderText: string;
}

export default function Searchbar({ placeholderText, ariaControls, ariaLabel, searchCallback }: SearchbarProps) {
  return (
    <div role="search" aria-label={ariaLabel} className="searchbar">
      <input
      className="searchbar__input"
      type="text"
      placeholder={placeholderText}
      aria-controls={ariaControls}
      onChange={(e) => searchCallback(e.target.value)}
      />
    </div>
  );
}

