 export const formatPhoneNumber = (phone: string): string => {
  if (phone.startsWith('0')) {
    return '254' + phone.slice(1);
  }
  return phone;
};
