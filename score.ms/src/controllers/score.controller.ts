import { Request, Response } from "express";
import { ScoreService } from "../services/score.service";
import { Logger } from "winston";

export class ScoreController {
  constructor(private scoreService: ScoreService, private logger: Logger) {}

  submitScore = async (
    req: Request,
    res: Response
  ): Promise<Response<boolean>> => {
    try {
      await this.scoreService.submitScore(req.body);
      return res.status(200).send(true);
    } catch (error: any) {
      this.logger.error("Error insert score", {
        error: error.message,
        body: req.body,
        headers: req.headers,
        params: req.params,
        query: req.query,
        ip: req.ip,
      });
      return res.status(500).json({ message: "Error insert score", error });
    }
  };

  topScore = async (
    req: Request,
    res: Response
  ): Promise<Response<{ score: number }>> => {
    try {
      const topTenScores = await this.scoreService.topTenScores();
      console.log(topTenScores);
      return res.status(200).send(topTenScores);
    } catch (error) {
      return res.status(500).json({ message: "Error creating player", error });
    }
  };
}
