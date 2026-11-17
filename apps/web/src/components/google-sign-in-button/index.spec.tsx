import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GoogleSignInButton } from "./index";

describe("GoogleSignInButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with accessible button role and Portuguese text", () => {
    render(<GoogleSignInButton />);

    const button = screen.getByRole("button", {
      name: /entrar com a conta institucional google/i,
    });
    expect(button).toBeInTheDocument();
    expect(screen.getByText("Entrar com Google")).toBeInTheDocument();
  });

  it("applies optional custom className", () => {
    render(<GoogleSignInButton className="custom-test-btn" />);
    const button = screen.getByRole("button", {
      name: /entrar com a conta institucional google/i,
    });
    expect(button).toHaveClass("custom-test-btn");
  });

  it("triggers custom onSignIn callback when clicked", async () => {
    const user = userEvent.setup();
    const handleSignIn = vi.fn();

    render(<GoogleSignInButton onSignIn={handleSignIn} />);
    const button = screen.getByRole("button", {
      name: /entrar com a conta institucional google/i,
    });

    await user.click(button);
    expect(handleSignIn).toHaveBeenCalledTimes(1);
  });

  it("redirects window.location to Google OAuth endpoint when clicked", async () => {
    const user = userEvent.setup();

    render(
      <GoogleSignInButton
        apiUrl="http://localhost:3000"
        returnUrl="/minha-sala/carteiras"
      />,
    );

    const button = screen.getByRole("button", {
      name: /entrar com a conta institucional google/i,
    });
    await user.click(button);

    expect(window.location.assign).toHaveBeenCalledWith(
      "http://localhost:3000/auth/google?returnUrl=%2Fminha-sala%2Fcarteiras",
    );
  });

  it("uses default /minha-sala returnUrl and fallback apiUrl when omitted", async () => {
    const user = userEvent.setup();

    render(<GoogleSignInButton returnUrl="" />);

    const button = screen.getByRole("button", {
      name: /entrar com a conta institucional google/i,
    });
    await user.click(button);

    expect(window.location.assign).toHaveBeenCalledWith("http://localhost:3000/auth/google");
  });

  it("does not trigger navigation or handler when disabled", async () => {
    const user = userEvent.setup();
    const handleSignIn = vi.fn();

    render(<GoogleSignInButton disabled onSignIn={handleSignIn} />);
    const button = screen.getByRole("button", {
      name: /entrar com a conta institucional google/i,
    });

    expect(button).toBeDisabled();
    await user.click(button);
    expect(handleSignIn).not.toHaveBeenCalled();
  });
});
