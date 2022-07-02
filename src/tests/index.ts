import startServer from '../server';
import { test1_method } from './test-pack1';
import { test2_method } from './test-pack2';
import { test3_method } from './test-pack3';

let app = startServer();

test1_method(app);
test2_method(app);
test3_method(app);
