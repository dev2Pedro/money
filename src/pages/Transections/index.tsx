import { useContext } from 'react';
import { Header } from '../../components/Header';
import { Summary } from '../../components/summary';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { SearchForm } from './components/SearchForm/inde';
import {
  PriceHighLight,
  TransectionContainer,
  TransectionTable,
} from './styles';
import { dateFormater, priceFormater } from '../../utils/formater';

export function Transections() {
  const { transactions } = useContext(TransactionsContext);

  return (
    <div>
      <Header />
      <Summary />

      <TransectionContainer>
        <SearchForm />
        <TransectionTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormater.format(transaction.price)}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormater.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransectionTable>
      </TransectionContainer>
    </div>
  );
}
