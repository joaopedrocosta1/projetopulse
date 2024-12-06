import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
}

import axios from 'axios';

export async function getSpotifyToken(): Promise<string> {
  const clientId = '6592d458de1347f0b9025d0c2fe4225e'; // Substitua pelo Client ID do Spotify
  const clientSecret = '033ec09bf50a49f4bb416f815815b607'; // Substitua pelo Client Secret do Spotify
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  // Codifique as credenciais em Base64
  const credentials = btoa(`${clientId}:${clientSecret}`);

  try {
    // Faça a requisição para obter o token
    const response = await axios.post(
      tokenUrl,
      'grant_type=client_credentials', // Body da requisição
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    return response.data.access_token; // Retorna o token de acesso
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    throw new Error('Não foi possível autenticar na Spotify API.');
  }
}