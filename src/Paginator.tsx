import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

export function Paginator({
  limit,
  count,
  nextPage,
  prevPage,
  onPageChange,
}: {
  limit: number;
  count: number;
  nextPage: number;
  prevPage: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <Stack direction="horizontal" gap={3}>
      <div className="p-2">
        Showing {limit} of {count} entries
      </div>
      {prevPage ? (
        <Button
          className="p-2 ms-auto"
          variant="outline-success"
          onClick={() => onPageChange(prevPage)}
        >
          Previous
        </Button>
      ) : (
        <div className="p-2 ms-auto"></div>
      )}
      {nextPage ? (
        <Button
          className="p-2"
          variant="outline-success"
          onClick={() => onPageChange(nextPage)}
        >
          Next
        </Button>
      ) : (
        <div className="p-2"></div>
      )}
    </Stack>
  );
}
