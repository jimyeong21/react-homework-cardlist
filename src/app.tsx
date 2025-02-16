import { ErrorBoundary } from 'react-error-boundary';
import CardList from './CardList';

function App() {
  return (
    <ErrorBoundary fallback={<p>Oops... 오류 발생! 😥</p>}>
      <CardList />
    </ErrorBoundary>
  );
}

export default App;
