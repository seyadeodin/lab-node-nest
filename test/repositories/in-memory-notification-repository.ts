import { NotificationNotFound } from '@app/use-cases/errors/notification-not-found';
import { Notification } from 'src/app/entities/notification';
import { NotificationsRepository } from 'src/app/repositories/notifications-repository';

class InMemoryNotificationsRepository implements NotificationsRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex < 0) {
      throw new NotificationNotFound();
    }

    this.notifications[notificationIndex] = notification;
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notificationId === notification.id,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const notificationsList = this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
    const notificationsCount = notificationsList.length;

    return notificationsCount;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notificationsList = this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );

    if (notificationsList.length <= 0) {
      throw new NotificationNotFound();
    }

    return notificationsList;
  }
}

export { InMemoryNotificationsRepository };
