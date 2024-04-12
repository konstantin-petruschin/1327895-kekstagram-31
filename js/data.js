import { getData } from './api.js';
import { getErrorMessage } from './util.js';

const data = await getData().catch(getErrorMessage);

export { data };
