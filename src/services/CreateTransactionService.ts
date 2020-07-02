import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();

      if (total < value) {
        throw Error(`You don't have all this money bro!`);
      }
    }

    const createdTransaction = this.transactionsRepository.create(transaction);

    return createdTransaction;
  }
}

export default CreateTransactionService;
