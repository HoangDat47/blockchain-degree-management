export interface DegreeRecord {
  studentName: string;
  email: string;
  issuer: string;
  degreeName: string;
  ifpsHash: string;
  ifpsUrl: string;
}

export interface Students {
  id: number;
  studentID: string;
  name: string;
  gender: string;
  gmail: string;
  gpa: number;
  phone: string;
  avatar: string;
  message?: string;
}
