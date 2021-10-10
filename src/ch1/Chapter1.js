import React, {useEffect} from "react";

import invoices from "./invoices.json";
import plays from "./plays.json";
import {statement, htmlStatement} from "./statement";

const Chapter1 = () => {
  useEffect(() => {
    invoices.forEach((invoice) => {
      console.log(statement(invoice, plays));
    });
  }, []);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: invoices.map((invoice) => htmlStatement(invoice, plays)) }} />
    </div>

  );
};



export default Chapter1;
