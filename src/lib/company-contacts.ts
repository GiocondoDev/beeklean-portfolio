export type CompanyContact = {
  id: string;
  label: string;
};

export type ContactGroup = {
  id: string;
  title: string;
  contacts: readonly CompanyContact[];
};

// Labels demonstrate the directory layout without publishing real contact details.
export const CONTACT_GROUPS: readonly ContactGroup[] = [
  {
    id: "departements",
    title: "Départements",
    contacts: [
      { id: "general", label: "Contact général" },
      { id: "sales", label: "Commercial" },
      { id: "administration", label: "Administration" },
      { id: "operations", label: "Opérations" },
    ],
  },
  {
    id: "direction",
    title: "Direction",
    contacts: [
      { id: "management", label: "Contact de direction" },
    ],
  },
];
