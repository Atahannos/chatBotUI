import { Injectable, signal } from '@angular/core';
import { Tab } from '../class/enums/tab';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  selectedTab = signal<Tab>(Tab.HOME);
  isLoggedIn = signal<boolean>(false);
  constructor() {}
}
