import ReactDOM from 'react-dom/client';
import { App } from './app/App';


const root = document.getElementById('root');

if (!root) {
  throw new Error('no root');
}

const container = ReactDOM.createRoot(root);

container.render(<App />);