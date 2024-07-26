import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RippleModule } from 'primeng/ripple';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    BadgeModule,
    RippleModule,
    AvatarModule,
    PanelMenuModule,
    ButtonModule,
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  constructor(protected router: Router, private _authService: AuthService) {}

  items: MenuItem[] = [
    {
      key: '0',
      label: 'Users',
      icon: 'pi pi-users',
      items: [
        {
          key: '0_1',
          label: 'New',
          items: [
            {
              key: '0_1_0',
              label: 'Member',
              route: 'dashboard/users/new/member',
            },
            {
              key: '0_1_1',
              label: 'Group',
              route: 'dashboard/users/new/group',
            },
          ],
        },
        {
          key: '0_2',
          label: 'List',
          route: 'dashboard/users',
        },
      ],
    },
    {
      key: '1',
      label: 'Tasks',
      icon: 'pi pi-server',
      items: [
        {
          key: '1_0',
          label: 'Add New',
          route: '/tasks/add-new',
        },
        {
          key: '1_1',
          label: 'Pending',
          route: '/tasks/pending',
        },
        {
          key: '1_2',
          label: 'Overdue',
          route: '/tasks/overdue',
        },
      ],
    },
    {
      key: '2',
      label: 'Calendar',
      icon: 'pi pi-calendar',
      items: [
        {
          key: '2_0',
          label: 'New Event',
          route: '/calendar/new-event',
        },
        {
          key: '2_1',
          label: 'Today',
          route: '/calendar/today',
        },
        {
          key: '2_2',
          label: 'This Week',
          route: '/calendar/this-week',
        },
      ],
    },
  ];

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveItems();
      });
    this.updateActiveItems();
  }

  updateActiveItems() {
    const currentRoute = this.router.url;
    this.items = this.updateActiveItemsRecursive(this.items, currentRoute);
  }

  updateActiveItemsRecursive(
    items: MenuItem[],
    currentRoute: string
  ): MenuItem[] {
    return items.map((menuItem) => {
      menuItem.expanded = false;
      if (menuItem['route'] && menuItem['route'] === currentRoute) {
        menuItem.expanded = true;
      }
      if (menuItem.items) {
        menuItem.items = this.updateActiveItemsRecursive(
          menuItem.items,
          currentRoute
        );
        if (menuItem.items.some((subItem) => subItem.expanded)) {
          menuItem.expanded = true;
        }
      }
      return menuItem;
    });
  }

  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }

  toggleAll() {
    const expanded = !this.areAllItemsExpanded();
    this.items = this.toggleAllRecursive(this.items, expanded);
  }

  private toggleAllRecursive(items: MenuItem[], expanded: boolean): MenuItem[] {
    return items.map((menuItem) => {
      menuItem.expanded = expanded;
      if (menuItem.items) {
        menuItem.items = this.toggleAllRecursive(menuItem.items, expanded);
      }
      return menuItem;
    });
  }

  private areAllItemsExpanded(): boolean {
    return this.items.every((menuItem) => menuItem.expanded);
  }

  logout() {
    this._authService.logout();
  }
}
