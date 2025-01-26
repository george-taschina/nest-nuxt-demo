import { AsyncLocalStorage } from 'async_hooks';

const georgeContext = new AsyncLocalStorage();
export default georgeContext;
