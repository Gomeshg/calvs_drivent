import { prisma } from "@/config";

async function findBooking(userId: number) {
  return prisma.booking.findMany({
    where: { userId },
    include: {
      Room: true,
    }
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({ data: { userId: userId, roomId: roomId } });
}

async function upsertBooking(bookingId: number, roomId: number) {
  return prisma.booking.upsert({
    where: {
      id: bookingId,
    },
    update: {
      roomId: roomId
    },
    create: undefined
  });
}

const bookingRepository = {
  findBooking,
  createBooking,
  upsertBooking
};

export default bookingRepository;
