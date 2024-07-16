import { useRecoilState } from 'recoil';
import { modalAtom } from '../../recoil/atom';
import { ModalType } from '../../types/type';
import DetailModal from './DetailModal';
import LoginModal from './LoginModal';
import WelcomeModal from './WelcomeModal';

export default function ModalProvider() {
  const [modal, setModal] = useRecoilState<ModalType>(modalAtom);

  const closeModal = () => {
    setModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <>
      <LoginModal
        isOpen={modal.isOpen && modal.type === 'login'}
        closeModal={closeModal}
      />
      <DetailModal
        isOpen={modal.isOpen && modal.type === 'detail'}
        closeModal={closeModal}
      />
      <WelcomeModal />
    </>
  );
}
