import { EndorseeModel } from "@/models/EndorseeModel";
import { EventModel } from "@/models/EventModel";

export default class ContractsApi {
  private static events: Map<string, EventModel> = new Map();

  constructor() {
    const mockEndorsee = new EndorseeModel('Mock Endorsee', '0xMockAddress');
    const mockEvent = new EventModel('mockId', 'Mock Event', 'This is a mock event', [mockEndorsee], '2022-01-01', '2022-12-31', 'mockPassword');
    ContractsApi.events.set(mockEvent.id, mockEvent);
  }

  async submitFeedback(feedback: string, password: string) {
    // Implement your logic to claim feedback
  }

  async claimFeedback(password: string) {
    // Implement your logic to claim feedback
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
    const event = new EventModel('id', name, description, endorseees, startDate, endDate, password);
    ContractsApi.events.set(event.id, event);

    console.log(`events: ${ContractsApi.events}`);
  }

}