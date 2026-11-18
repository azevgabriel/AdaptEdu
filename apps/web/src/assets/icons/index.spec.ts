import { describe, it, expect } from "vitest";
import * as Icons from "./index";

describe("Icons Root Barrel", () => {
  it("exports BaseIcon", () => {
    expect(Icons.BaseIcon).toBeDefined();
  });

  it("exports all expected navigation icons", () => {
    expect(Icons.ChevronDownIcon).toBeDefined();
    expect(Icons.CloseIcon).toBeDefined();
    expect(Icons.HomeIcon).toBeDefined();
    expect(Icons.LogoutIcon).toBeDefined();
  });

  it("exports all expected people icons", () => {
    expect(Icons.UserIcon).toBeDefined();
    expect(Icons.UsersIcon).toBeDefined();
  });

  it("exports all expected tools icons", () => {
    expect(Icons.AccessibilityIcon).toBeDefined();
    expect(Icons.ChalkboardIcon).toBeDefined();
    expect(Icons.ClockIcon).toBeDefined();
    expect(Icons.DocumentIcon).toBeDefined();
    expect(Icons.EyeIcon).toBeDefined();
    expect(Icons.MoonIcon).toBeDefined();
    expect(Icons.PaletteIcon).toBeDefined();
    expect(Icons.PrismIcon).toBeDefined();
    expect(Icons.ResetIcon).toBeDefined();
    expect(Icons.SettingsIcon).toBeDefined();
    expect(Icons.SunIcon).toBeDefined();
  });

  it("exports all expected feedback icons", () => {
    expect(Icons.AlertCircleIcon).toBeDefined();
    expect(Icons.CheckIcon).toBeDefined();
    expect(Icons.InfoIcon).toBeDefined();
  });

  it("exports all expected brand icons", () => {
    expect(Icons.AdaptEduIcon).toBeDefined();
    expect(Icons.GitHubIcon).toBeDefined();
    expect(Icons.GoogleIcon).toBeDefined();
    expect(Icons.LinkedInIcon).toBeDefined();
  });
});
