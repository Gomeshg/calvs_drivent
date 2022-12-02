
import { notFoundError, unauthorizedError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);
  if(!booking) throw notFoundError;

  return booking;
}

async function insertBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw notFoundError();
  }

  const booking = await bookingRepository.createBooking(userId, roomId);
  return { roomId: booking.id };
}

async function updateBooking(bookingId: number, roomId: number) {
//   const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
//   if (!enrollment) {
//     throw notFoundError();
//   }
  
  //   const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  
  //   if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
  //     throw notFoundError();
  //   }

  await bookingRepository.upsertBooking(bookingId, roomId);
}

export const serviceBooking = {
  getBooking,
  insertBooking,
  updateBooking
};
