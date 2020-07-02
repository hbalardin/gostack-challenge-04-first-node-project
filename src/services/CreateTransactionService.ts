import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error('Transaction type is invalid');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw Error(`You don't have all this money bro!`);
    }

    const createTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return createTransaction;
  }
}

export default CreateTransactionService;
