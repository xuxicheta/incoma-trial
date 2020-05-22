import { InjectionToken } from '@angular/core';



export const API_KEY = new InjectionToken<string>('API_KEY' , {
  providedIn: 'root',
  factory: () => '526a2f059c5450afa042042af5b00c00',
});
