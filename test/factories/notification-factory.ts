import { Notification, NotificationProps } from '@app/entities/notification';
import { Content } from '../../src/app/entities/content';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova solicitação de inimizade!'),
    recipientId: 'recipient-1',
    ...override,
  });
}
