export const totalByType = (txns, type) =>
  txns.filter(t => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);

export const getTransactionsByType = (txns, type) =>
  txns.filter(t => t.type === type);

export const formatReceipts = (txns) =>
  txns.map(({ customer, amount }) => 
    `Receipt for ${customer}: ${amount} ETB`
  );

export const updateTransactionAmount = (txn, newAmount) => ({
  ...txn,
  amount: newAmount
});