import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/NewQuotes")({
  component: NewQuotes,
});

function NewQuotes() {
  return <div className="bg-red-600">dfqg</div>;
}
