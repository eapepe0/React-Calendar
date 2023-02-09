import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {
  const dispatch = useDispatch();
  //* sacamos del store , el valor de isDateModalOpen
  const { isDateModalOpen } = useSelector((state) => state.ui);
  //* abrimos el modal
  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };
  //* cerramos el modal
  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };
  return {
    //* props
    isDateModalOpen,
    //* metodos
    openDateModal,
    closeDateModal,
  };
};
