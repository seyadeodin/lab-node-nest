import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { SendNotification } from './send-notification';

let sendNotification: SendNotification;
let countRecipientNotifications: CountRecipientNotifications;
let notificationsRepository: InMemoryNotificationsRepository;

describe("Count recipient's notifications", () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();

    sendNotification = new SendNotification(notificationsRepository);
    countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );
  });

  it('should be able to count recipient notifications', async () => {
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

    //const { notification } = await sendNotification.execute({
    //  content: 'This is a notification',
    //  category: 'social',
    //  recipientId: 'example-recipient-id',
    //});

    //await sendNotification.execute({
    //  content: 'This is another notification',
    //  category: 'social',
    //  recipientId: 'example-recipient-id',
    //});

    //await sendNotification.execute({
    //  content: 'This is another notification',
    //  category: 'social',
    //  recipientId: 'another-recipient-id',
    //});

    const recipientNotifications = await countRecipientNotifications.execute({
      recipientId: 'example-recipent',
    });

    console.log(recipientNotifications);

    expect(recipientNotifications.count).toEqual(2);
  });
});
