import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  selectedChatId = 1;
  isDrawerOpen = true;
  screenWidth: number = window.innerWidth;

  chats = [
    { id: 1, name: 'ChatGPT' },
    { id: 2, name: 'GPT Keşfet' },
  ];

  messages: { text: string; sender: 'bot' | 'user' }[] = [
    { text: 'Merhaba! Size nasıl yardımcı olabilirim?', sender: 'bot' },
    { text: 'Angular hakkında bir sorum var.', sender: 'user' },
  ];

  newMessage = '';

  editingIndex: number | null = null; // Düzenlenen mesajın indeksi
  editingMessage: string = ''; // Düzenleme için geçici mesaj

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  selectChat(chatId: number): void {
    this.selectedChatId = chatId;
    this.messages = [
      { text: `Sohbete hoş geldiniz: Chat ${chatId}!`, sender: 'bot' },
    ];
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, sender: 'user' });
      setTimeout(() => {
        this.messages.push({
          text: 'Ben bir botum, size nasıl yardımcı olabilirim?',
          sender: 'bot',
        });
      }, 1000);
      this.newMessage = '';
    }
  }

  messageClass(message: { sender: 'user' | 'bot' }): string {
    return message.sender === 'user' ? 'chat chat-end' : 'chat chat-start';
  }

  startEditing(
    message: { text: string; sender: 'bot' | 'user' },
    index: number
  ) {
    this.editingIndex = index;
    this.editingMessage = message.text;
  }

  saveEditedMessage(index: number): void {
    if (this.editingMessage.trim()) {
      this.newMessage = this.editingMessage;
      this.sendMessage();
      this.editingIndex = null;
      this.editingMessage = '';
    }
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
    if (this.screenWidth > 700) {
      this.isDrawerOpen = true;
    } else {
      this.isDrawerOpen = false;
    }
  }
  cancelEditing() {
    this.editingIndex = null;
  }
}
