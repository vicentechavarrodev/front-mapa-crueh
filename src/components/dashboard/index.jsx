import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mostrar } from "./slices";
import AlertCustomDialog from "../dialogs";
import Mapa from "../map";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Command,
  Presentation,
  ChartArea,
  Clipboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NavUser from "./nav_item_user";
import { obtener_session } from "../sockets/services";
import { Separator } from "@/components/ui/separator";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarInput,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const user = {
  name: "prueba",
  email: "prueba@example.com",
  avatar: "/avatars/shadcn.jpg",
};

const Dashboard = ({
  children,
  mostrar,
  posiciones,
  obtener_session,
  incrementar,
  contador,
}) => {
  const Enviar = () => {
    console.log(contador);
    return contador + 1;
  };
  useEffect(() => {
    obtener_session();
    return;
  }, []);

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "350px",
      }}
    >
      <Sidebar
        collapsible="icon"
        className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      >
        <Sidebar
          collapsible="none"
          className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                      >
                        <a href={item.url}>
                          <item.icon />
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <Sidebar collapsible="none" className="hidden flex-1 md:flex">
          <SidebarHeader className="gap-3.5 border-b p-4">
            <div className="flex w-full items-center justify-between">
              <div className="text-foreground text-base font-medium"></div>
            </div>
            <SidebarInput placeholder="Type to search..." />
          </SidebarHeader>
        </Sidebar>
      </Sidebar>

      <AlertCustomDialog></AlertCustomDialog>
      <SidebarInset>
        <main>{children}</main>
        <div className="flex flex-1 flex-col gap-4">
          <header className="flex  shrink-0 items-center gap-2 border-b px-2">
            <SidebarTrigger />

            <ButtonGroup className="bg-muted/50 rounded-xl  shadow-none p-1">
              <Button
                variant="outline"
                size="sm"
                className=" border-none shadow-none"
              >
                <Presentation /> Dashboard
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="text-gray-500 border-none shadow-none"
              >
                <ChartArea />
                Analiticas
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="text-gray-500 border-none shadow-none"
              >
                <Clipboard />
                Reportes
              </Button>
            </ButtonGroup>
            <div className="w-full  sm:ml-auto sm:w-auto ">
              <NavUser user={user} />
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4">
            <div className="grid auto-rows-min gap-2 grid-cols-3 px-3 h-30">
              <div className="bg-muted/50 aspect-video rounded-xl h-30 w-full"></div>
              <div className="bg-muted/50 aspect-video rounded-xl h-30 w-full" />
              <div className="bg-muted/50 aspect-video rounded-xl h-30 w-full" />
            </div>
            <div className="bg-muted/50 min-h-[50vh] flex-1  ">
              <Mapa />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

const mapStateToProps = (state) => ({
  posiciones: state.web_socket.posiciones,
  contador: state.map.contador,
});

const mapDispatchToProps = (dispatch) => ({
  mostrar: (valor) => dispatch(mostrar(valor)),
  obtener_session: () => dispatch(obtener_session()),
  incrementar: (value) => dispatch(incrementar(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
