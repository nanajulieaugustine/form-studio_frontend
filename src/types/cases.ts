export type CaseService = {
  id: string;
  name: string;
};

export type Case = {
  id: string;
  name: string;
  problem_statement?: string;
  quote?: string;
  description?: string;
  service?: CaseService | CaseService[] | null;
  services?: CaseService[];
  service_fk?: string | string[];
  thumbnail?: string;
};

export type CaseCardProps = {
    selectedService: string | number | null;
};