import { useSelector } from 'react-redux';
import { RootState } from "../redux"

const useGetUser = () => {
  const currentUser = useSelector((state:RootState) => state.user);
  if (currentUser) {
    return currentUser;
  }
  return null;
};

export default useGetUser;
