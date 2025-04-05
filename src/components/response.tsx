import React, { ChangeEvent } from "react";

type QueryPropType = {
  onResponseChange: any;
  currentResponseContent: string | undefined;
};
const Response = (props: QueryPropType) => {
  const { onResponseChange, currentResponseContent } = props;

  const handleQueryChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event?.target?.value;
    onResponseChange(value);
  };

  return (
    <div className="response-container">
      <span>Please paste your json content here</span>
      <textarea
        id="json-text-area"
        onChange={handleQueryChange}
        value={currentResponseContent}
      />
    </div>
  );
};

export default Response;
