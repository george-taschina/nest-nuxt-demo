import ctx from '@has-george-read-backend/core/utils/george-context';

const LOGGING_DATA_KEY = 'loggingData';
const USER_KEY = 'user';
const TRANSACTION_ID_KEY = 'transactionId';

export const getExtraLoggingInfo = () => {
  const transactionId = (ctx.getStore() as Map<string, string>)?.get(
    TRANSACTION_ID_KEY
  );
  const userId = (ctx.getStore() as Map<string, string>)?.get(USER_KEY);
  const metadata = (ctx.getStore() as Map<string, string>)?.get(
    LOGGING_DATA_KEY
  );
  return {
    ...(transactionId ? { transaction_id: transactionId } : {}),
    ...(userId ? { user_id: userId } : {}),
    ...(metadata ? { metadata } : {}),
  };
};
