import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mostrar } from "./slices";
import { incrementar } from "../map/slices";
import AlertCustomDialog from "../dialogs";
import { Calendar, Home, Inbox, Search, Settings, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavUser from "./nav_item_user";
import { obtener_session } from "../sockets/services";
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
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      </Sidebar>
      <AlertCustomDialog></AlertCustomDialog>
      <SidebarInset>
        <main>{children}</main>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Skeleton className="h-full w-full " />
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
                  {posiciones.map((item, index) => (
                    <Card key={index} className="@container/card">
                      <CardHeader>
                        <CardTitle>Latitud</CardTitle>
                        <CardDescription>{item.lat}</CardDescription>

                        <CardTitle>Longitud</CardTitle>
                        <CardDescription>{item.lng}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <CardTitle>{item.Id}</CardTitle>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
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
