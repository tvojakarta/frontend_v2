export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('sr-RS', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const downloadTicket = (orderNumber: string) => {
  // Mock ticket download
  console.log(`Preuzimanje karte za narudžbu ${orderNumber}`);
};