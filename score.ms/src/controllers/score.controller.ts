import { Request, Response } from "express";
import { ScoreService } from "../services/score.service";

export class ScoreController {
  private ScoreService: ScoreService;

  constructor() {
    this.ScoreService = new ScoreService();
  }

  submitScore = async (
    req: Request,
    res: Response
  ): Promise<Response<boolean>> => {
    try {
      await this.ScoreService.submitScore(req.body);
      return res.status(200).send(true);
    } catch (error) {
      return res.status(500).json({ message: "Error insert score", error });
    }
  };

  topScore = async (
    req: Request,
    res: Response
  ): Promise<Response<{ score: number }>> => {
    try {
      const topTenScores = await this.ScoreService.topTenScores();
      return res.status(200).send(topTenScores);
    } catch (error) {
      return res.status(500).json({ message: "Error creating player", error });
    }
  };
}
