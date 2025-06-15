import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import PaginationController from "./PagionationController";

// selectors
const sNextPageButton = "page-controls-next";
const sPrevPageButton = "page-controls-prev";

const setPageNumber = jest.fn();

beforeEach(() => {
  setPageNumber.mockReset();
});

test("prev page button is disabled when on page 1; next page is enabled when not on last page", async () => {
  render(
    <PaginationController
      totalPageNumbers={2}
      currentPageNumber={1}
      setPageNumber={setPageNumber}
    />,
  );

  const prevPageButton = await screen.findByTestId(sPrevPageButton);
  const nextPageButton = await screen.findByTestId(sNextPageButton);
  expect(prevPageButton).toBeDisabled();
  expect(nextPageButton).not.toBeDisabled();
});

test("prev page button is enabled when not on page 1; next page is disabled when on last page", async () => {
  render(
    <PaginationController
      totalPageNumbers={2}
      currentPageNumber={2}
      setPageNumber={setPageNumber}
    />,
  );

  const prevPageButton = await screen.findByTestId(sPrevPageButton);
  const nextPageButton = await screen.findByTestId(sNextPageButton);
  expect(prevPageButton).not.toBeDisabled();
  expect(nextPageButton).toBeDisabled();
});

test("calls set page number when either previous or next page buttons are clicked", async () => {
  userEvent.setup();
  render(
    <PaginationController
      totalPageNumbers={3}
      currentPageNumber={2}
      setPageNumber={setPageNumber}
    />,
  );

  expect(setPageNumber).not.toHaveBeenCalled();
  const prevPageButton = await screen.findByTestId(sPrevPageButton);
  const nextPageButton = await screen.findByTestId(sNextPageButton);

  await userEvent.click(prevPageButton);
  expect(setPageNumber).toHaveBeenCalledTimes(1);
  await userEvent.click(nextPageButton);
  expect(setPageNumber).toHaveBeenCalledTimes(2);
});
