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
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    for (const perf of invoice.performances) {
      // Print statement
      result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} ${perf.audience}석\n`;
    }

    result += `총액: ${usd(totalAmount())}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`
    return result;

    // Nested functions below
    function totalAmount() {
      let result = 0;
      for (const perf of invoice.performances) {
        result += amountFor(perf);
      }
      return result;
    }

    function totalVolumeCredits() {
      let result = 0;
      for (let perf of invoice.performances) {
        result += volumeCreditsFor(perf);
      }
      return result;
    }

    function usd(aNumber) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(aNumber / 100);
    }

    function volumeCreditsFor(aPerformance) {
      let result = 0;
      result += Math.max(aPerformance.audience - 30, 0);
      if (playFor(aPerformance).type === 'comedy')
        result += Math.floor(aPerformance.audience / 5);

      return result;
    }

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
