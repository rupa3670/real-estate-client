export interface Engineer {
  _id: string;
  name: string;
  phone: string;
  monthlySalary: number;
  createdAt: string;
}

export type EngineerInput = Pick<Engineer, "name" | "phone" | "monthlySalary">;