import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  userId: string;
}

const getIdFromToken = (): string => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const decoded = jwtDecode<DecodedToken>(token);

  return decoded.userId;
};

export default getIdFromToken;
