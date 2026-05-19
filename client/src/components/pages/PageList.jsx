import React from "react";

import { useGetPages } from "@/hooks/page.query.js";

import Page from "./Page";

const PageList = ({ sectionId }) => {
  const { data: pages = [], isLoading } = useGetPages(sectionId);

  if (isLoading) {
    return (
      <div className="space-y-1 px-2">
        <div className="h-8 rounded-md bg-muted animate-pulse" />
        <div className="h-8 rounded-md bg-muted animate-pulse" />
      </div>
    );
  }

  if (!pages.length) {
    return <p className="px-3 py-1 text-xs text-muted-foreground">No pages</p>;
  }

  return (
    <div className="space-y-1">
      {pages.map((page) => (
        <Page key={page._id} page={page} sectionId={sectionId} />
      ))}
    </div>
  );
};

export default React.memo(PageList);
