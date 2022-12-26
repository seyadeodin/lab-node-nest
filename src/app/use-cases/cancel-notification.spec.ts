import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { SendNotification } from './send-notification';

let cancelNotification: CancelNotification;
let sendNotification: SendNotification;
let notificationsRepository: InMemoryNotificationsRepository;

describe('Send notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();

    sendNotification = new SendNotification(notificationsRepository);
    cancelNotification = new CancelNotification(notificationsRepository);
  });

  it('should be able to cancel a notification', async () => {
    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });

  it('should not be able to cancel a non-existent notification', async () => {
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'non-existent-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
