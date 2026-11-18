import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GoogleSignInButton } from "./index";

describe("GoogleSignInButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with accessible button role, Portuguese label, and institutional aria-label", () => {
    render(<GoogleSignInButton />);

    const button = screen.getByRole("button", {
      name: /entrar com a conta institucional google/i,
    });
    expect(button).toBeInTheDocument();

    const visibleLabel = screen.getByText("Entrar com Google");
    expect(visibleLabel).toBeInTheDocument();

    // Verify institutional accessible name
    expect(button).toHaveAttribute(
      "aria-label",
      "Entrar com a conta institucional Google"
    );
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
      />
    );

    const button = screen.getByRole("button", {
      name: /entrar com a conta institucional google/i,
    });
    await user.click(button);

    expect(window.location.assign).toHaveBeenCalledWith(
      "http://localhost:3000/auth/google?returnUrl=%2Fminha-sala%2Fcarteiras"
    );
  });

  it("uses default /minha-sala returnUrl and fallback apiUrl when omitted", async () => {
    const user = userEvent.setup();

    render(<GoogleSignInButton returnUrl="" />);

    const button = screen.getByRole("button", {
      name: /entrar com a conta institucional google/i,
    });
    await user.click(button);

    expect(window.location.assign).toHaveBeenCalledWith(
      "http://localhost:3000/auth/google"
    );
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

    // Directly invoke click event to verify explicit guard branch
    fireEvent.click(button);
    expect(handleSignIn).not.toHaveBeenCalled();
  });

  it("renders with native type='button' and decorative logo marked aria-hidden='true'", () => {
    const { container } = render(<GoogleSignInButton />);
    const button = screen.getByRole("button", {
      name: /entrar com a conta institucional google/i,
    });

    expect(button).toHaveAttribute("type", "button");
    const iconWrapper = container.querySelector('[class*="googleIconBox"]');
    expect(iconWrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("supports keyboard activation via Enter and Space keys", async () => {
    const user = userEvent.setup();
    const handleSignIn = vi.fn();

    render(<GoogleSignInButton onSignIn={handleSignIn} />);
    const button = screen.getByRole("button", {
      name: /entrar com a conta institucional google/i,
    });

    button.focus();
    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(handleSignIn).toHaveBeenCalledTimes(1);

    await user.keyboard(" ");
    expect(handleSignIn).toHaveBeenCalledTimes(2);
  });

  it("satisfies the 'Never Color Alone' invariant with both visible text and vector iconography", () => {
    const { container } = render(<GoogleSignInButton />);

    // 1. Textual confirmation
    expect(screen.getByText("Entrar com Google")).toBeInTheDocument();

    // 2. Iconographic confirmation
    const svgIcon = container.querySelector("svg");
    expect(svgIcon).toBeInTheDocument();
  });

  it("complies with Dyslexia invariant by avoiding italic styles", () => {
    render(<GoogleSignInButton />);
    const label = screen.getByText("Entrar com Google");
    const computedStyle = window.getComputedStyle(label);
    expect(computedStyle.fontStyle).not.toBe("italic");
  });
});
