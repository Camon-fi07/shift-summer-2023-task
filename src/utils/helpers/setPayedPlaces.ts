import { Schedules } from "utils/types/schedules";

export const setPayedPlaces = (schedules: Schedules[]): Schedules[] => {
  schedules.forEach((day, dayIdnex) =>
    day.seances.forEach((seance, seanceIndex) => {
      seance.payedTickets.forEach((ticket) => {
        schedules[dayIdnex].seances[seanceIndex].hall.places[ticket.row - 1][ticket.column - 1].type = "payed";
      });
    }),
  );
  return schedules;
};
