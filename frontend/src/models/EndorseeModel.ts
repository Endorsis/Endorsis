
export class EndorseeModel {
  name: string;
  address: string;
  feedback: string[];

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
    this.feedback = Array();
  }
}
