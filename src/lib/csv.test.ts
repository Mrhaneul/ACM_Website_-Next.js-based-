import { describe, it, expect } from "vitest";
import { buildCsv } from "./csv";

describe("buildCsv", () => {
  it("returns an empty string for an empty array (export button is disabled in this case, so this is a defensive default, not a UI path)", () => {
    expect(buildCsv([])).toBe("");
  });

  it("builds a header + one data row for a single registration", () => {
    const csv = buildCsv([
      { fullName: "Jane Smith", cbuEmail: "jsmith@calbaptist.edu", cbuId: "123456789", teams: ["SET", "ICPC"] },
    ]);
    const lines = csv.split("\r\n").filter(Boolean);
    expect(lines[0]).toBe("fullName,cbuEmail,cbuId,teams");
    expect(lines[1]).toBe('Jane Smith,jsmith@calbaptist.edu,123456789,"SET;ICPC"');
  });

  it("quotes values containing commas", () => {
    const csv = buildCsv([{ fullName: "Smith, Jane", cbuEmail: "a@calbaptist.edu" }]);
    expect(csv).toContain('"Smith, Jane"');
  });

  it("escapes double quotes inside a value", () => {
    const csv = buildCsv([{ fullName: 'Jane "JJ" Smith', cbuEmail: "a@calbaptist.edu" }]);
    expect(csv).toContain('"Jane ""JJ"" Smith"');
  });

  it("joins array fields (like teams) with a semicolon", () => {
    const csv = buildCsv([{ fullName: "Jane", teams: ["SET", "Game Design"] }]);
    expect(csv).toContain('"SET;Game Design"');
  });
});
