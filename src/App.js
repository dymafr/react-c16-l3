import React from 'react';
import styles from './App.module.scss';
import { useState, lazy, Suspense } from 'react';
import ComposantA from './pages/ComposantA/ComposantA';

const ComposantB = lazy(
  () =>
    new Promise((res) =>
      setTimeout(() => res(import('./pages/ComposantB/ComposantB')), 3000)
    )
);

function App() {
  const [page, setPage] = useState('a');

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <nav className="d-flex p-20">
        <button className="btn btn-primary mr-5" onClick={() => setPage('a')}>
          Composant A
        </button>
        <button className="btn btn-primary mr-5" onClick={() => setPage('b')}>
          Composant B
        </button>
      </nav>
      <div className="flex-fill p-20">
        <Suspense fallback={<h3>Chargement...</h3>}>
          {page === 'a' && <ComposantA />}
          {page === 'b' && <ComposantB />}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
