import React, {useEffect} from "react";
import invoices from "./invoices.json";
import plays from "./plays.json";

const Chapter1 = () => {
  useEffect(() => {
    invoices.forEach((invoice) => {
      console.log(statement(invoice, plays));
    })
  }, []);

  const statement = (invoice, plays) => {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    const format = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format;

    for (let perf of invoice.performances) {
      let thisAmount = amountFor(perf);

      // Save credits
      volumeCredits += Math.max(perf.audience - 30, 0);
      // Additional credits for comedy audience
      if (playFor(perf).type === 'comedy')
        volumeCredits += Math.floor(perf.audience / 5);

      // Print statement
      result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} ${perf.audience}석\n`;
      totalAmount += thisAmount;
    }

    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`
    return result;

    function amountFor(aPerformance) {
      let result = 0;

      switch (playFor(aPerformance).type) {
        case 'tragedy':
          result = 40000;
          if (aPerformance.audience > 30) {
            result += 1000 * (aPerformance.audience - 30);
          }
          break;

        case 'comedy':
          result = 30000;
          if (aPerformance.audience > 20) {
            result += 10000 + 500 * (aPerformance.audience - 20);
          }
          result += 300 * aPerformance.audience;
          break;

        default:
          throw new Error(`Unknown Genre: ${playFor(aPerformance).type}`);
      }

      return result;
    }

    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }
  };

  return (<></>);
};

export default Chapter1;
