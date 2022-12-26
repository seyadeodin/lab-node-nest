import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { GetRecipientNotifications } from './get-recipient-notifications';

let notificationsRepository: InMemoryNotificationsRepository;
let getRecipientNotifications: GetRecipientNotifications;

describe('Get recipients notification', () => {
  beforeAll(async () => {
    notificationsRepository = new InMemoryNotificationsRepository();

    getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'example-recipent' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'example-recipent' }),
    );
    await notificationsRepository.create(
      makeNotification({
        recipientId: 'another-recipient-id',
      }),
    );
  });

  it('should be able to get recipient notifications', async () => {
    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'example-recipent',
    });

    expect(notifications.length).toEqual(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipent' }),
        expect.objectContaining({ recipientId: 'example-recipent' }),
      ]),
    );
  });

  it('should not be able to get a non-exisitant recipient notification', async () => {
    expect(async () => {
      await getRecipientNotifications.execute({
        recipientId: 'non-existent-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
