import type { EndorseeModel } from "@/models/EndorseeModel";
import { EventModel } from "@/models/EventModel";

export default class ContractsApi {
  private static events: Map<string, EventModel> = new Map();


  async getEndorsees(eventId: string) {
    // Implement your logic to fetch endorsees from the smart contract
  }

  async isUserEndorsee(userId: string, eventId: string) {
    // Implement your logic to check if the user is an endorsee
  }

  async claimFeedback(userId: string, eventId: string) {
    // Implement your logic to claim feedback
  }

  async getEvents() {
    return Array.from(ContractsApi.events.values());
  }

  async createEvent(name: string, description: string, endorseees: EndorseeModel[], startDate: string, endDate: string, password: string) {
    const event = new EventModel('id', name, description, endorseees, startDate, endDate, password);
    ContractsApi.events.set(event.id, event);

    console.log(`events: ${ContractsApi.events}`);
  }

}