import { useEffect } from "react";

import { TodoItem } from "../types/reducers/todo";

const useTodoNotify = (
  item: TodoItem,
  handler: (fieldVal: string, idx: number) => void
) => {
  const changeTime = (value: string, idx: number) => {
    const permission = Notification.permission;
    switch (permission) {
      case "granted":
        handler(value, idx);
        break;
      case "denied":
        return false;
      case "default":
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            handler(value, idx);
          }
        });
    }
  };
  //если человек отказался, ТО отстаем от него
  //если проигнорил, то снова спросим до тех пор, пока не согласится или не заблочит
  //если согласен, то устанавливаем время

  //notify проверят каждый 10 сек(тоесть когда время пришло, через 10 секунд выведит), если время совпало или элемент
  // удалили, то уберам интервал

  //если перезагрузить стр, то пять вылезит, до тех пор, пока не удалим или не сменим время
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (item.time?.length) {
      interval = setInterval(() => {
        const options = {
          tag: "tasks",
          body: `Пришло напоминание для задачи: ${item.title}`,
        };
        const currentTime = new Date()
          .toLocaleTimeString()
          .replace(/(:\d{2}| [AP]M)$/, "");
        if (currentTime >= item.time) {
          clearInterval(interval);
          new Notification("Напоминание", options);
        }
      }, 1000 * 10);
    }
    return () => clearInterval(interval);
  }, [item]);

  return { changeTime };
};

export default useTodoNotify;
