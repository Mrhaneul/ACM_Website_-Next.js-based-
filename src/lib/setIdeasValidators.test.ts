import { describe, it, expect } from "vitest";
import {
  validateIdeaForm,
  initialIdeaForm,
  CATEGORY_OPTIONS,
  INVOLVEMENT_OPTIONS,
  type IdeaForm,
} from "./setIdeasValidators";

function validForm(overrides: Partial<IdeaForm> = {}): IdeaForm {
  return {
    fullName: "Jane Smith",
    cbuEmail: "jsmith@calbaptist.edu",
    ideaTitle: "Campus parking tracker",
    description: "A live map of open parking spots around campus.",
    category: "Web",
    techInterest: "React, Firebase",
    involvement: "I want to lead it",
    ...overrides,
  };
}

describe("validateIdeaForm", () => {
  it("accepts a fully filled form", () => {
    expect(validateIdeaForm(validForm())).toBe("");
  });

  it("accepts a form with techInterest left blank", () => {
    expect(validateIdeaForm(validForm({ techInterest: "" }))).toBe("");
  });

  it("rejects the empty initial form", () => {
    expect(validateIdeaForm(initialIdeaForm)).not.toBe("");
  });

  it("requires a full name", () => {
    expect(validateIdeaForm(validForm({ fullName: "   " }))).toMatch(/full name/i);
  });

  it("requires a calbaptist.edu email", () => {
    expect(validateIdeaForm(validForm({ cbuEmail: "jane@gmail.com" }))).toMatch(/calbaptist\.edu/i);
  });

  it("requires an idea title", () => {
    expect(validateIdeaForm(validForm({ ideaTitle: "" }))).toMatch(/title/i);
  });

  it("requires a description", () => {
    expect(validateIdeaForm(validForm({ description: "  " }))).toMatch(/describe/i);
  });

  it("rejects a category that is not in the option list", () => {
    expect(validateIdeaForm(validForm({ category: "Blockchain" }))).toMatch(/category/i);
  });

  it("rejects an involvement value that is not in the option list", () => {
    expect(validateIdeaForm(validForm({ involvement: "Maybe" }))).toMatch(/involved/i);
  });

  it("accepts every declared category option", () => {
    for (const category of CATEGORY_OPTIONS) {
      expect(validateIdeaForm(validForm({ category }))).toBe("");
    }
  });

  it("accepts every declared involvement option", () => {
    for (const involvement of INVOLVEMENT_OPTIONS) {
      expect(validateIdeaForm(validForm({ involvement }))).toBe("");
    }
  });
});
