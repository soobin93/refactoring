import React, {useEffect} from "react";
import invoices from "./invoices.json";
import plays from "./plays.json";

const Chapter1 = () => {
  useEffect(() => {
    invoices.forEach((invoice) => {
      console.log(statement(invoice, plays));
    })
  }, []);

  return (<></>);
};

function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);

  return renderPlainText(statementData, plays);

  function enrichPerformance(aPerformance) {
    const result = {...aPerformance};
    result.play = playFor(result);
    result.amount = amountFor(result);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;

    switch (aPerformance.play.type) {
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
        throw new Error(`Unknown Genre: ${aPerformance.play.type}`);
    }

    return result;
  }
}

function renderPlainText(data, plays) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (const perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount)} ${perf.audience}석\n`;
  }

  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`
  return result;

  // Nested functions below
  function totalAmount() {
    let result = 0;
    for (const perf of data.performances) {
      result += perf.amount;
    }
    return result;
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of data.performances) {
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
    if (aPerformance.play.type === 'comedy')
      result += Math.floor(aPerformance.audience / 5);

    return result;
  }
}

export default Chapter1;
