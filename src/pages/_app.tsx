import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification';
import WalletTransactionPage from '../components/WalletTransactionsPage';
import Transactions from "../components/Transactions";
import { SessionProvider } from "next-auth/react";
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

// Extend the AppProps type to include session
interface MyAppProps extends AppProps {
  pageProps: {
    session?: any; // Use the appropriate session type here
  };
}

const App: FC<MyAppProps> = ({ Component, pageProps }) => {
    return (
        <SessionProvider session={pageProps.session}>
          <Head>
            <title>Solana Scaffold Lite</title>
          </Head>

          <ContextProvider>
            <div className="flex flex-col h-screen">
              <Notifications />
              <AppBar /> 
              <ContentContainer>
                {/* Uncomment to use the component passed to _app */}
                {/* <Component {...pageProps} /> */}
                <div className="py-10 mx-11"><WalletTransactionPage/></div>
                <div className="py-10 mx-11"><Transactions/></div>
              </ContentContainer>
              <Footer/>
            </div>
          </ContextProvider>
        </SessionProvider>
    );
};

export default App;
