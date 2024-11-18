import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  selectedChatId = 1;
  isDrawerOpen = true;
  screenWidth: number = window.innerWidth;

  chats = [
    { id: 1, name: 'ChatGPT' },
    { id: 2, name: 'GPT Keşfet' },
  ];

  recentChats = [
    { id: 3, name: 'Daisy UI Kullanımı' },
    { id: 4, name: 'Tailwind CSS Kurulumu' },
  ];

  olderChats = [
    { id: 5, name: 'Ng-Zorro Kullanımı' },
    { id: 6, name: 'Angular Routing' },
  ];

  messages: { text: string; sender: 'bot' | 'user' }[] = [
    { text: 'Hello! How can I help you?', sender: 'bot' },
    { text: 'I have a question about Angular.', sender: 'user' },
  ];

  newMessage = '';
  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
  selectChat(chatId: number): void {
    this.selectedChatId = chatId;
    this.messages = [{ text: `Welcome to Chat ${chatId}!`, sender: 'bot' }];
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, sender: 'user' });
      setTimeout(() => {
        this.messages.push({
          text: "I'm a bot, how can I assist you?",
          sender: 'bot',
        });
      }, 1000);
      this.newMessage = '';
    }
  }

  messageClass(message: { sender: 'user' | 'bot' }): string {
    return message.sender === 'user' ? 'chat chat-end' : 'chat chat-start';
  }
  ngOnInit(): void {
    if (this.screenWidth < 700) {
      this.isDrawerOpen = false;
    } else {
      this.isDrawerOpen = true;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;

    // Menü 700px üzerindeyse varsayılan olarak açık
    if (this.screenWidth > 700) {
      this.isDrawerOpen = true;
    } else {
      this.isDrawerOpen = false;
    }
  }
}
