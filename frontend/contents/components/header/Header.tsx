import {Button, Switch, NavLink, Group, Input, FocusTrap, Card} from "@mantine/core";
import Notify from "../Notify/Notify";
import { useState, useContext, useEffect } from 'react';
import Link from "next/link";
import { ProfileContext } from "@/contexts/ProfileContext";
import {
    IconArrowBack, IconBell,
    IconDashboard,
    IconFileText,
    IconHome,
    IconMenu2,
    IconSearch, IconUser,
    IconUsers
} from "@tabler/icons-react";
import UserInfors from "./UserInfors";
import {useRouter, usePathname} from "next/navigation";
import { SpotlightProvider, spotlight } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';

function SpotlightControl() {
    return (
        <Group position="center">
            <Input onClick={spotlight.open} placeholder={'Search'} icon={<IconSearch />} className={'mr-6 -mt-1'} autoFocus={false}
                   tabIndex={-1}
                   onMouseDown={(e) => e.preventDefault()}/>
        </Group>
    );
}

const actions: SpotlightAction[] = [
    {
        title: 'Home',
        description: 'Get to home page',
        onTrigger: () => console.log('Home'),
        icon: <IconHome size="1.2rem" />,
    },
    {
        title: 'Dashboard',
        description: 'Get full information about current system status',
        onTrigger: () => console.log('Dashboard'),
        icon: <IconDashboard size="1.2rem" />,
    },
    {
        title: 'Documentation',
        description: 'Visit documentation to lean more about all features',
        onTrigger: () => console.log('Documentation'),
        icon: <IconFileText size="1.2rem" />,
    },
];

function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const { authorized, profile, logout, violationData } = useContext(ProfileContext);
  const [apiMode, setApiMode] = useState('Database');
  const router = useRouter();
  const pathname = usePathname();
  /**
   * Reload the page with the latest data
   */

  return (
      <Card className='flex bg-gray-100 h-[60px] justify-between w-screen'>
      <div>
          {pathname == '/dashboard' ?
              <div>Welcome back {profile?.name}</div> :
              <Button
                    onClick={() => router.push('/dashboard')}
                    leftIcon={<IconArrowBack/>}
                    variant="gradient" gradient={{ from: 'indigo', to: 'violet.9' }}
                    radius={'xl'}
                    className='ml-5 flex'
              > Back to dashboard </Button>
          }
      </div>

      <div className='flex flex-row'>
          <SpotlightProvider
              actions={actions}
              searchIcon={<IconSearch size="1.2rem" />}
              searchPlaceholder="Search..."
              shortcut="mod + shift + 1"
              nothingFoundMessage="Nothing found..."
          >
              <SpotlightControl />
          </SpotlightProvider>

          <IconBell className='ml-9'/>
          <IconUser className='ml-3'/>
          <div className='ml-2 mr-9'>{profile?.name}</div>
      </div>

      </Card>
  );
}

export default Header
