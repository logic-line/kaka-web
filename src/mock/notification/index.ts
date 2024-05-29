import {UpdateNotification, ListFilterRequest } from "@/types/notification";
import notification from "./data/notification";

export default class NotificationMockService {
    FetchGetNotificationList(listfilter: ListFilterRequest) {
        return new Promise((resolve) => {
          resolve(notification.NotificationList);
        });
      }
    FetchNotificationUpdate(updateNotification: UpdateNotification) {
      return new Promise((resolve) => {
        resolve(notification.Notification);
      });
    }  
}