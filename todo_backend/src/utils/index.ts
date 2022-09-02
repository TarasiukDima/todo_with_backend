import { EOL } from 'os';
import { JoinColumnOptions } from 'typeorm';
import { fieldRegExp } from '../settings';

export const getJoinColumnOptions = (name: string): JoinColumnOptions => {
  return {
    name: name,
    referencedColumnName: 'id',
  };
};

export const getErrorMessage = (message: string, error: Error): string => {
  return `${message},${EOL}Stack: ${error.stack}${EOL + EOL}`;
};

export const getTokenFromHeadersString = async (
  tokenString: string,
): Promise<string> => {
  const token = tokenString.replace('Bearer ', '');

  return token;
};

export const clearTypingData = (typeData: string): string => {
  return typeData.replace(fieldRegExp, ' ');
};
