import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ClassroomPage from "./page";

describe("ClassroomPage", () => {
  it("renders classroom page container without crashing", () => {
    const { container } = render(<ClassroomPage />);
    expect(container).toBeInTheDocument();
  });
});



