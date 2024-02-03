import { FC } from 'react';
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAutoConnect } from '../contexts/AutoConnectProvider';

export const AppBar: FC = ({ children }) => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const { data: session } = useSession();

  return (
    <div>
      <div className="navbar flex flex-row md:mb-2 shadow-lg bg-neutral text-neutral-content">
        <div className="navbar-start">
          {/* Your existing navbar-start content */}
        </div>

        <div className="hidden md:inline md:navbar-center">
          {/* Your existing navbar-center content */}
        </div>

        <div className="navbar-end">
          <div className="flex items-center space-x-4">
            {/* Auto-connect and other settings */}
            <div className="dropdown">
              <div tabIndex={0} className="btn btn-square btn-ghost text-right">
                {/* Settings icon */}
              </div>
              <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box sm:w-52">
                <li>
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span>Auto-connect</span>
                      <input type="checkbox" checked={autoConnect} onChange={(e) => setAutoConnect(e.target.checked)} className="toggle" />
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            {/* Conditional rendering based on session state */}
            {!session ? (
              <button onClick={() => signIn()} className="btn btn-primary">Sign in</button>
            ) : (
              <>
                <span>{session.user.email}</span>
                <button onClick={() => signOut()} className="btn btn-ghost">Sign out</button>
              </>
            )}

            <WalletMultiButton className="btn btn-ghost" />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
