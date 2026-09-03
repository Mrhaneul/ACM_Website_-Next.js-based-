import { describe, it, expect } from "vitest";
import { isValidCbuEmail, isValidCbuId } from "./registrationValidators";

describe("isValidCbuEmail", () => {
  it("accepts a lowercase calbaptist.edu address", () => {
    expect(isValidCbuEmail("jsmith@calbaptist.edu")).toBe(true);
  });

  it("accepts a mixed-case calbaptist.edu address", () => {
    expect(isValidCbuEmail("JSmith@CalBaptist.EDU")).toBe(true);
  });

  it("rejects a non-CBU domain", () => {
    expect(isValidCbuEmail("jsmith@gmail.com")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isValidCbuEmail("")).toBe(false);
  });

  it("rejects a domain that merely contains calbaptist.edu as a substring", () => {
    expect(isValidCbuEmail("jsmith@calbaptist.edu.evil.com")).toBe(false);
  });
});

describe("isValidCbuId", () => {
  it("accepts a digits-only string", () => {
    expect(isValidCbuId("123456789")).toBe(true);
  });

  it("rejects letters", () => {
    expect(isValidCbuId("12345abcd")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isValidCbuId("")).toBe(false);
  });

  it("rejects whitespace-only", () => {
    expect(isValidCbuId("   ")).toBe(false);
  });
});
