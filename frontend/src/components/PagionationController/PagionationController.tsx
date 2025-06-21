import "./PagionationController.css";

type PaginationControllerProps = {
  totalPageNumbers: number;
  currentPageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

export default function PaginationController({
  totalPageNumbers,
  currentPageNumber,
  setPageNumber,
}: PaginationControllerProps) {
  return (
    <section className="page-controls">
      <div className="page-controls__previous-page-wrapper">
        <button
          onClick={() => setPageNumber((curr) => curr - 1)}
          disabled={currentPageNumber <= 1}
          className="page-controls__previous-page-button button--standard button--secondary--inverse"
          data-testid="page-controls-prev"
        >
          Previous Page
        </button>
      </div>
      <div className="page-controls__currrent-page-wrapper">
        <span className="page-controls__current-page-text">
          Page {currentPageNumber} of {totalPageNumbers}
        </span>
      </div>
      <div className="page-controls__next-wrapper">
        <button
          onClick={() => setPageNumber((curr) => curr + 1)}
          disabled={currentPageNumber >= totalPageNumbers}
          className="page-controls__next-page-button button--standard button--secondary--inverse"
          data-testid="page-controls-next"
        >
          Next Page
        </button>
      </div>
    </section>
  );
}
