import cors from "cors";
import express from "express";
import fs from "fs";
import { getRandomChanceFlag, getTimeoutInMs, mapFlight } from "./utils";

const PORT = 3001;
const MIN_TIMEOUT_IN_SECONDS = 0.5;
const MAX_TIMEOUT_IN_SECONDS = 3;
const ERROR_CHANCE_IN_PERCENTAGE = 20;
const FLIGHT_DETAIL_FIELD_CHANCE = 75;

const flights: any[] = JSON.parse(
  fs.readFileSync("./flights.json", "utf8")
).map(mapFlight(FLIGHT_DETAIL_FIELD_CHANCE));

const errorMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  setTimeout(() => {
    return next();
  }, getTimeoutInMs(MIN_TIMEOUT_IN_SECONDS, MAX_TIMEOUT_IN_SECONDS));
};

const timeoutMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (getRandomChanceFlag(ERROR_CHANCE_IN_PERCENTAGE)) {
    return res.status(500).send({ error: "Something went wrong" });
  }
  return next();
};

const app = express();
app.use(cors())
app.use(errorMiddleware);
app.use(timeoutMiddleware);

app.get("/flights", (req: express.Request, res: express.Response) => {
  res.json(flights.map(({ details, ...flight }) => flight));
});

app.get("/flights/:id", (req: express.Request, res: express.Response) => {
  const flight = flights.find((flight) => flight.uuid === req.params.id);
  if (flight) {
    res.json(flight.details);
  } else {
    res.status(404).send();
  }
});

app.post("/flights", (req: express.Request, res: express.Response) => {
  res.status(200).send();
});

app.listen(PORT, () => console.log(`App server works on port: ${PORT}`));
