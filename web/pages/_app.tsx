import { AppProps } from 'next/app';
// 3rd party css
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
// listlist css
import '../global-styles/main.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div suppressHydrationWarning={true}>
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
    </div>
  );
};

export default App;
