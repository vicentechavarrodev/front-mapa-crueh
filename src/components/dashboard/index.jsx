import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mostrar } from "./slices";
import AlertCustomDialog from "../dialogs";
import Mapa from "../map";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Presentation,
  ChartArea,
  Clipboard,
  Ambulance,
  Activity,
  ClipboardPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NavUser from "./nav_item_user";
import { obtener_session } from "../sockets/services";
import { ButtonGroup } from "@/components/ui/button-group";
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
        <div className="flex flex-1 flex-col gap-4 w-full">
          <header className="flex  shrink-0 items-center gap-2 border-b px-2">
            <SidebarTrigger />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <ButtonGroup className="bg-muted/50 rounded-xl  shadow-none p-1">
                <Button
                  variant="outline"
                  size="sm"
                  className=" border-none shadow-none cursor-pointer"
                >
                  <Presentation /> Dashboard
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-gray-500 border-none shadow-none cursor-pointer"
                >
                  <ChartArea />
                  Analiticas
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-gray-500 border-none shadow-none cursor-pointer"
                >
                  <Clipboard />
                  Reportes
                </Button>
              </ButtonGroup>
            </div>
            <div className="w-full  sm:ml-auto sm:w-auto ">
              <NavUser user={user} />
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 w-full">
            <div className="grid auto-rows-min gap-2 grid-cols-1 md:grid-cols-3 px-3 ">
              <Card className="@container/card h-full w-full py-1 p-2">
                <CardHeader>
                  <CardDescription>Ambulancias</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
                    50
                  </CardTitle>
                  <CardAction>
                    <Badge variant="outline">
                      <Ambulance />
                      20%
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="text-muted-foreground">
                    Vehiculos activos hoy
                  </div>
                </CardFooter>
              </Card>
              <Card className="@container/card h-full py-1 p-2">
                <CardHeader>
                  <CardDescription>Casos activos</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
                    28
                  </CardTitle>
                  <CardAction>
                    <Badge variant="outline">
                      <Activity />
                      -5%
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="text-muted-foreground">
                    Total de casos activos hoy
                  </div>
                </CardFooter>
              </Card>
              <Card className="@container/card h-full py-1 p-2">
                <CardHeader>
                  <CardDescription>Casos atendidos</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
                    286
                  </CardTitle>
                  <CardAction>
                    <Badge variant="outline">
                      <ClipboardPlus />
                      +12.5%
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="text-muted-foreground">
                    Total general de casos atendidos
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] min-h-[100vh] flex-1 rounded-xl md:min-h-min p-3">
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
