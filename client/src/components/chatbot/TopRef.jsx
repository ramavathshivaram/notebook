import React, { memo, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import { getMessagesApi } from "@/helper/api.js";
import useMessageStore from "@/store/message.store.js";

const LIMIT = 10;

const TopRef = ({ resourceId }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const addMessages = useMessageStore((state) => state.addMessages);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      if (!inView || !hasMore || isLoading) return;

      try {
        setIsLoading(true);

        console.log(resourceId);

        const data = await getMessagesApi(resourceId, page, LIMIT);

        if (!data?.length) {
          setHasMore(false);
          return;
        }

        addMessages(data);
        setPage((prev) => prev + 1);

        if (data.length < LIMIT) {
          setHasMore(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [inView, hasMore, isLoading, page, resourceId, addMessages]);

  return (
    <div ref={ref} className="flex justify-center py-2">
      {isLoading && (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      )}

      {!hasMore && (
        <p className="text-xs text-muted-foreground">No more messages</p>
      )}
    </div>
  );
};

export default memo(TopRef);
