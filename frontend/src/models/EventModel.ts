import type { EndorseeModel } from "./EndorseeModel";

export class EventModel {
  id: string;
  name: string;
  description: string;
  endorseees: EndorseeModel[];
  startDate: string;
  endDate: string;
  password: string;

  constructor(id: string, name: string, description: string, endorseees: EndorseeModel[], startDate: string, endDate: string, password: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.endorseees = endorseees;
    this.startDate = startDate;
    this.endDate = endDate;
    this.password = password;
  }
}

// export class EventTemplateData {
//   id: string;
//   name: string;
//   description: string;
//   endorseees: Endorsee[];
//   startDate: string;
//   endDate: string;
//   password: string;

//   constructor(id: string, name: string, description: string, endorseees: Endorsee[], startDate: string, endDate: string, password: string) {
//     this.id = id;
//     this.name = name;
//     this.description = description;
//     this.endorseees = endorseees;
//     this.startDate = startDate;
//     this.endDate = endDate;
//     this.password = password;
//   }
// }