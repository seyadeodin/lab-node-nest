import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { ReadNotification } from './read-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { SendNotification } from './send-notification';
import { makeNotification } from '@test/factories/notification-factory';

let readNotification: ReadNotification;
let sendNotification: SendNotification;
let notificationsRepository: InMemoryNotificationsRepository;

describe('Read notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();

    sendNotification = new SendNotification(notificationsRepository);
    readNotification = new ReadNotification(notificationsRepository);
  });

  it('should be able to read a notification', async () => {
    const notification = makeNotification({
      readAt: new Date(),
    });
    notificationsRepository.create(notification);

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });

  it('should not be able to read a non-existent notification', async () => {
    expect(() => {
      const notification = makeNotification({
        readAt: new Date(),
      });

      notificationsRepository.create(notification);

      return readNotification.execute({
        notificationId: 'non-existent-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
