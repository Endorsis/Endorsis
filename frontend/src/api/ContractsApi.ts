import { EndorseeModel } from "@/models/EndorseeModel";
import { EventModel } from "@/models/EventModel";
import CryptoJS from 'crypto-js';

export default class ContractsApi {
  private static events: Map<string, EventModel> = new Map();

  constructor() {

    this.createEvent(
      'Event Completed', 
      'This is a mock event', 
      [
        { 
          name: 'Mock Endorsee',
          address: '0xMockAddress',
          feedback: [] 
        },
      ], 
      '2022-01-01', 
      '2022-12-31', 
      'aa78ea657e8cd58aa5bab0d75a4d1dae04865864b07139b622ea689e5fa19730'
    );

    this.createEvent(
      'Event Uncompleted', 
      'This is a mock event', 
      [
        { 
          name: 'Mock Endorsee',
          address: '0xMockAddress',
          feedback: []
        },
      ], 
      '2022-01-01', 
      '2024-04-15', 
      'aa78ea657e8cd58aa5bab0d75a4d1dae04865864b07139b622ea689e5fa19730'
    );

    // const mockEndorsee = new EndorseeModel('Mock Endorsee', '0xMockAddress');
    // // password mockPassword
    // const mockEvent = new EventModel('95ccae2f78868f3e2a4bd22e796701461f993d22373068bf27edee61d50aa3de', 'Event Completed', 'This is a mock event', [mockEndorsee], '2022-01-01', '2022-12-31', 'aa78ea657e8cd58aa5bab0d75a4d1dae04865864b07139b622ea689e5fa19730');
    // ContractsApi.events.set(mockEvent.id, mockEvent);


    // const mockEndorsee2 = new EndorseeModel('Not completed', '0xMockAddress');
    // const mockEvent2 = new EventModel('95ccae2f78868f3e2a4bd22e796701461f993d22373068bf27edee61d50aa3d2', 'Event Uncompleted', 'This is a mock event', [mockEndorsee2], '2022-01-01', '2024-04-15', 'aa78ea657e8cd58aa5bab0d75a4d1dae04865864b07139b622ea689e5fa19730');
    // ContractsApi.events.set(mockEvent2.id, mockEvent2);
  }

  async submitFeedback(eventId: string, endorsee_address: string, feedback: string, password: string) {
    console.log(`submitFeedback ${eventId}, ${feedback}, ${password}`);

    const event = await this.getEventsById(eventId);
    const event_password = event?.password
    const hashedPassword = CryptoJS.SHA256(password).toString();

    if (hashedPassword === event_password){
      const endorsee = event?.endorseees.find(e => e.address === endorsee_address);

      console.log(endorsee);
      if (endorsee) {
        if (!endorsee.feedback){
          endorsee.feedback = [];
        }
        endorsee.feedback.push(feedback);
        console.log(`Feedback added for endorsee ${endorsee.name}`);
      } else {
        console.log('Endorsee not found.');
      }
      console.log(endorsee?.feedback);

    } else {
      window.alert("Incorrect password. Please try again.");
    }
  }

  async claimFeedback(password: string): Promise<string> {
    console.log(`claimFeedback password: ${password}`);

    return 'You are my honey badger';
  }

  async getEvents() {
    return Array.from(ContractsApi.events.values());
  }

  async getEventsById(id: string): Promise<EventModel | null> {
    const event = ContractsApi.events.get(id) || null;
    console.log(`getEventsById: events: ${ContractsApi.events.keys.length}, event: ${event}`)
    return event;
  }

  async createEvent(name: string, description: string, endorseees: EndorseeModel[], startDate: string, endDate: string, password: string) {
    // generating the id of the contract 
    const eventInfo = `${name}${description}${JSON.stringify(endorseees)}${startDate}${endDate}${password}`;
    const sha256Hash = CryptoJS.SHA256(eventInfo).toString();
    console.log(`SHA256 Event Address: ${sha256Hash}`);

    const event = new EventModel(sha256Hash, name, description, endorseees, startDate, endDate, password);
    ContractsApi.events.set(event.id, event);

    console.log(`events: ${ContractsApi.events}`);
  }
}