import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

type QueryPropType = {
  onQueryChange: any;
  currentQuery: string;
};
const Query = (props: QueryPropType) => {
  const { onQueryChange, currentQuery } = props;

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;
    onQueryChange(value);
  };

  return (
    <div className="query-container">
      <span>Put your query identifier for the api call</span>
      <input
        type="text"
        placeholder="please put your target query here"
        onChange={handleQueryChange}
        value={currentQuery}
      />
    </div>
  );
};

export default Query;
