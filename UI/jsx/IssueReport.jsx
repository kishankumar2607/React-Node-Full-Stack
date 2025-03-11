import React from "react";

const IssueReporter = () => {
  return (
    <div>
      <h1>Issue Reporter</h1>
      <form>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          Description:
          <textarea name="description" rows="4" cols="50" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default IssueReporter;
