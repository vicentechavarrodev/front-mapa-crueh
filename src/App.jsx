import Dashboard from "./components/dashboard";
import "./App.css";
import { loader } from "./utils/loader.jsx";
import React from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "./components/ui/sidebar";

function App({ children }) {
  loader.hide();
  return (
    <SidebarProvider>
      <Dashboard></Dashboard>
      <SidebarInset>
        <main>{children}</main>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
