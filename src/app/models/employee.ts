export class employee {
  employeeId: number;
  departmentId: number;
  empName: string;
  address: string;
  birthday: Date;
  gender: string;
  email: string;
  timeStartWork: Date;
  timeEndWork: Date;
  salary: number;
  note: string;
  role: string;
  createdBy: string;
  createdAt: Date;
  empStatus: string;

  constructor(
    employeeId: number,
    departmentId: number,
    empName: string,
    address: string,
    birthday: Date,
    gender: string,
    email: string,
    timeStartWork: Date,
    timeEndWork: Date,
    salary: number,
    note: string,
    role: string,
    createdBy: string,
    createdAt: Date,
    empStatus: string
  ) {
    this.employeeId = employeeId;
    this.departmentId = departmentId;
    this.empName = empName;
    this.address = address;
    this.birthday = birthday;
    this.gender = gender;
    this.email = email;
    this.timeStartWork = timeStartWork;
    this.timeEndWork = timeEndWork;
    this.salary = salary;
    this.note = note;
    this.role = role;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.empStatus = empStatus;
  }
}

