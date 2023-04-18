export const getRandomChanceFlag = (chance: number) => {
  return Math.random() * 100 < chance;
};

export const getTimeoutInMs = (min: number, max: number) =>
  (Math.random() * (max - min) + min) * 1000;

export const mapFlight =
  (flightDetailFieldChance: number) => (flight: any) => {
    return {
      ...flight,
      details: {
        ...(getRandomChanceFlag(flightDetailFieldChance)
          ? { remainingNumberOfSeats: flight.details.remainingNumberOfSeats }
          : {}),
        ...(getRandomChanceFlag(flightDetailFieldChance)
          ? { seatPitch: flight.details.seatPitch }
          : {}),
        ...(getRandomChanceFlag(flightDetailFieldChance)
          ? { freeBaggageAllowed: flight.details.freeBaggageAllowed }
          : {}),
        ...(getRandomChanceFlag(flightDetailFieldChance)
          ? { cabinClass: flight.details.cabinClass }
          : {}),
      },
    };
  };
