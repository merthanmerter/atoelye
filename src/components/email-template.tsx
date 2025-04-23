import * as React from "react";

export const EmailTemplate: React.FC<
  Readonly<{
    name: string;
  }>
> = ({ name }) => (
  <div>
    <h1>Welcome, {name}!</h1>
  </div>
);

export default EmailTemplate;
