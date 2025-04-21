import { Request, Response } from "express";
import { EventService } from "../services/events.service";
import { EventInput, EventQuery } from "../models/interface";

export class EventController {
  private eventService = new EventService();

  constructor() {
    this.eventService = new EventService();
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      const data: EventInput = {
        ...req.body,
        userId: user.id
      };
      console.log('Data yang dikirimkan ke Prisma:', data);
      
      const result = await this.eventService.create(data);
      res.status(201).json({
        message: "Event created successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        message: "Event not created successfully",
        detail: error,
      });
    }
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    try {
      const query: EventQuery = {
        search: req.query.search as string,
        location: req.query.location as string,
        category: req.query.category as string,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      };
      const result = await this.eventService.findAll(query);
      res.status(200).json({
        message: "Events displayed successfully",
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        message: "Failed to display events",
        detail: error,
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: Partial<EventInput> = req.body;
      const result = await this.eventService.update(Number(id), data);
      res.status(200).json({
        message: "Event updated successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        message: "Failed to update event",
        detail: error,
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.eventService.delete(Number(id));
      res.status(200).json({
        message: "Event deleted successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        message: "Failed to delete event",
        detail: error,
      });
    }
  }
}
