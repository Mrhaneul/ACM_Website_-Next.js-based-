import { isValidCbuEmail } from "./registrationValidators";

export const SET_IDEAS_COLLECTION = "setIdeas";

export const CATEGORY_OPTIONS = [
  "Web",
  "Mobile",
  "Game",
  "AI/ML",
  "Hardware/IoT",
  "Cybersecurity",
  "Data",
  "Other",
];

export const INVOLVEMENT_OPTIONS = [
  "I want to lead it",
  "I want to help build it",
  "Just suggesting the idea",
];

export interface IdeaForm {
  fullName: string;
  cbuEmail: string;
  ideaTitle: string;
  description: string;
  category: string;
  techInterest: string;
  involvement: string;
}

export const initialIdeaForm: IdeaForm = {
  fullName: "",
  cbuEmail: "",
  ideaTitle: "",
  description: "",
  category: "",
  techInterest: "",
  involvement: "",
};

// Returns "" when the form is valid, otherwise a user-facing message.
export function validateIdeaForm(form: IdeaForm): string {
  if (!form.fullName.trim()) return "Please enter your full name.";
  if (!isValidCbuEmail(form.cbuEmail)) return "Please enter a valid @calbaptist.edu email address.";
  if (!form.ideaTitle.trim()) return "Please give your idea a title.";
  if (!form.description.trim()) return "Please describe your idea.";
  if (!CATEGORY_OPTIONS.includes(form.category)) return "Please pick a category.";
  if (!INVOLVEMENT_OPTIONS.includes(form.involvement)) return "Please tell us how you'd like to be involved.";
  return "";
}
