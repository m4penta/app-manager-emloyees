export class Department {
  departmentId: number;
  name: string;
  description: string;
  status: string;
  createdBy: string;
  createdAt: Date;
  establishedDate: Date;

  constructor(
    departmentId: number,
    name: string,
    description: string,
    status: string,
    createdBy: string,
    createdAt: Date,
    establishedDate: Date
  ) {
    this.departmentId = departmentId;
    this.name = name;
    this.description = description;
    this.status = status;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.establishedDate = establishedDate;
  }
}
export class departmentRequest {
  name: string;
  description: string;
  status: string;
  createdBy: string;
  createdAt: Date;
  establishedDate: Date;
  constructor(
    name: string,
    description: string,
    status: string,
    createdBy: string,
    createdAt: Date,
    establishedDate: Date
  ) {
    this.name = name;
    this.description = description;
    this.status = status;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.establishedDate = establishedDate
  }
}
