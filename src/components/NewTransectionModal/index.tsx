import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import {
  Overlay,
  Content,
  CloseButton,
  TransectionType,
  TransectionTypeButton,
} from './styles';
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type NewTransactionFormInput = z.infer<typeof newTransactionFormSchema>;

export function NewTransectionModal() {
  const { createTransaction } = useContext(TransactionsContext);

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<NewTransactionFormInput>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  });

  const type = watch('type');

  function handleSelectType(value: 'income' | 'outcome') {
    setValue('type', value);
  }

  async function handleCreateNewTransaction(data: NewTransactionFormInput) {
    const { description, price, category, type } = data;

    await createTransaction({
      description,
      price,
      category,
      type,
    });

    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              // console.log(field);

              return (
                <TransectionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransectionTypeButton
                    type="button"
                    variant="income"
                    value="income"
                    onClick={() => handleSelectType('income')}
                    data-state={type === 'income' ? 'checked' : 'unchecked'}
                  >
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransectionTypeButton>

                  <TransectionTypeButton
                    type="button"
                    variant="outcome"
                    value="outcome"
                    onClick={() => handleSelectType('outcome')}
                    data-state={type === 'outcome' ? 'checked' : 'unchecked'}
                  >
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransectionTypeButton>
                </TransectionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
