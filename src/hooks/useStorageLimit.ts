import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { TypedUseStorageLimit } from "../types/hooks";

const useStorageLimit: TypedUseStorageLimit = (todoItems) => {
  const {
    formState: { errors },
    setError,
  } = useForm();

  const [isCanBeAdded, handleIsCanBeAdded] = useState<boolean>(true);

  useEffect(() => {
    !isCanBeAdded &&
      setError("storage", {
        message: "Превышен лимит записей, удалите несколько штук",
      });
    //eslint-disable-next-line
  }, [isCanBeAdded]);

  useEffect(() => {
    if ("storage" in navigator && "estimate" in navigator.storage) {
      navigator.storage.estimate().then((estimate) => {
        //Уменьшил для того, что бы не было в упор,
        // что бы проверить сделайте так: estimate.quota - estimate.quota
        if (estimate.usage && estimate.quota)
          estimate.usage >= estimate.quota - 1000000
            ? handleIsCanBeAdded(false)
            : handleIsCanBeAdded(true);
      });
    }
  }, [todoItems]);

  return { storageLimitError: errors.storage?.message, isCanBeAdded };
};

export default useStorageLimit;
