import React, {useEffect} from "react";
import invoices from "./invoices.json";
import plays from "./plays.json";
import {statement} from "./statement";

const Chapter1 = () => {
  useEffect(() => {
    invoices.forEach((invoice) => {
      console.log(statement(invoice, plays));
    })
  }, []);

  return (<></>);
};



export default Chapter1;
