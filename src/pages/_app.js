import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { AppProps } from "next/app";
import { MdClose } from "react-icons/md";
import { ToastContainer } from "react-toastify";

import "@/styles/globals.css";
import "@/styles/theme.css";
import "react-toastify/dist/ReactToastify.css";

import commands from "@/data/commands";

import CommandPalette from "@/components/CommandPalette/CommandPalette";
import Header from "@/components/Layout/Header";
import Layout from "@/components/Layout/Layout";

import PreferenceProvider from "@/context/Preference/PreferenceContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) {
  return (
    <PreferenceProvider>
      <CommandPalette data={commands} />
      <Layout>
        <ToastContainer
          toastClassName={() =>
            "relative flex p-1 mt-4 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-hl text-bg border-2 border-hl mx-4"
          }
          bodyClassName={() =>
            "flex px-2 py-2 text-sm font-primary block accent-hl"
          }
          closeButton={() => (
            <MdClose className="text-bg/80 transition-colors duration-200 hover:text-bg" />
          )}
        />
        <Header />

        <AnimatePresence mode="wait">
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </PreferenceProvider>
  );
}
