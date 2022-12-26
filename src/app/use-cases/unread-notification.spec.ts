import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { UnreadNotification } from './unread-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

let unreadNotification: UnreadNotification;
let notificationsRepository: InMemoryNotificationsRepository;

describe('Unread notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    unreadNotification = new UnreadNotification(notificationsRepository);
  });

  it('should be able to unread a notification', async () => {
    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull;
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });

  it('should not be able to unread a non-existent notification', async () => {
    expect(async () => {
      const notification = makeNotification({
        readAt: new Date(),
      });

      await notificationsRepository.create(notification);

      await unreadNotification.execute({ notificationId: notification.id });

      return unreadNotification.execute({
        notificationId: 'non-existent-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
