import { HeaderContainer, HeaderContent, NewTransectionButton } from './styles';
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from '../../assets/logo.svg';
import { NewTransectionModal } from '../NewTransectionModal';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransectionButton>Nova transição</NewTransectionButton>
          </Dialog.Trigger>

          <NewTransectionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
