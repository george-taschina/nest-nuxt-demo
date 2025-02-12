import { defineStore } from 'pinia';
import type { ReservationResponse } from '@has-george-read/shared/domain/tour/reservation';
import type { TourGetAvailableResponse } from '@has-george-read/shared/domain/tour/tour-get-available';

interface ReservationState {
  reservation: ReservationResponse | null;
  tour: TourGetAvailableResponse | null;
}

export const useReservationStore = defineStore('reservation', {
  state: (): ReservationState => {
    return {
      reservation: null,
      tour: null,
    };
  },
  getters: {
    isExpired: (state) =>
      state.reservation !== null
        ? state.reservation.expiresAt <= new Date()
        : true,
  },
});
