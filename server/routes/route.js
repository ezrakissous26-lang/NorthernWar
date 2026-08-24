import express from "express";
import {
  checkIfBodyExist,
  checkIfTerritoryBodyExist,
  checkTerritoryId,
  checkValidGameId,
} from "../middleware/midlleware.js";
import { createNewGame, getOneById } from "../repo/game-repo.js";
import { initMapForCreateGame } from "../services/services.js";

export const router = express.Router();

router.post("/games", checkIfBodyExist, async (req, res) => {
    const playerName = req.body.playerName.trim();
    try {
        await initMapForCreateGame();
        const result = await createNewGame(playerName);
        return res.status(201).json(await getOneById(result.insertedId));
    } catch (err) {
        res.status(err.status).json({ error: err.message });
    }
});

router.get("/games/:id", await checkValidGameId, async (req, res) => {
    const gameId = req.params.id;
    try {
        const result = await getOneById(gameId);
        res.status(200).json(result);
    } catch (err) {
        res.status(err.status).json({ error: err.message });
  }

});

router.post("/games/:id/reinforce", checkIfTerritoryBodyExist ,checkTerritoryId, (req, res) => {
  res.send("banana");
});

router.post("/games/:id/attack", (req, res) => {
  res.send("banana");
});

router.post("/games/:id/move", (req, res) => {
  res.send("banana");
});

router.post("/games/:id/end-turn", (req, res) => {
  res.send("banana");
});
