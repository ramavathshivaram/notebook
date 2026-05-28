import React from "react";

import ListSkeleton from "@/skeletons/ListSkeleton";

import { useGetPages } from "@/hooks/page.query.js";

import Page from "./Page";

const PageList = ({ sectionId }) => {
  const { data: pages = [], isLoading } = useGetPages(sectionId);

  if (isLoading) {
    return <ListSkeleton count={3} />;
  }

  if (!pages.length) {
    return (
      <div className="px-3 py-6 text-center text-xs text-zinc-500">
        No pages found
      </div>
    );
  }

  return (
    <div className="space-y-1 p-1">
      {pages.map((page) => (
        <Page key={page._id} page={page} sectionId={sectionId} />
      ))}
    </div>
  );
};

export default React.memo(PageList);
