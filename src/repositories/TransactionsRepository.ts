import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const income = incomeTransactions.reduce(
      (previousValue, currentValue) => previousValue + currentValue.value,
      0,
    );
    const outcome = outcomeTransactions.reduce(
      (previousValue, currentValue) => previousValue + currentValue.value,
      0,
    );
    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
