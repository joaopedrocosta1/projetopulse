import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  playlists: any[] = []; // Variável para armazenar as playlists
  topTracks: any[] = [];  // Array para armazenar as músicas populares ou artistas populares

  // Obter token de autenticação
  async getSpotifyToken(): Promise<string> {
    const clientId = '6592d458de1347f0b9025d0c2fe4225e'; // Substitua pelo seu Client ID
    const clientSecret = '033ec09bf50a49f4bb416f815815b607'; // Substitua pelo seu Client Secret
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const credentials = btoa(`${clientId}:${clientSecret}`); // Codifica as credenciais em Base64

    try {
      const response = await axios.post(
        tokenUrl,
        'grant_type=client_credentials',
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
      throw new Error('Erro na autenticação.');
    }
  }

  // Buscar playlists destacadas
  async fetchFeaturedPlaylists(): Promise<void> {
    try {
      const token = await this.getSpotifyToken(); // Obtém o token
      const response = await axios.get(
        'https://api.spotify.com/v1/browse/featured-playlists?limit=50',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Passa o token no header
          },
        }
      );
      this.playlists = response.data.playlists.items; // Armazena as playlists na variável
    } catch (error) {
      console.error('Erro ao buscar playlists:', error);
    }
  }

  // Buscar as músicas mais populares (não requer OAuth)
  async fetchTopTracks(): Promise<void> {
    try {
      const token = await this.getSpotifyToken(); // Obtém o token
      const response = await axios.get(
        'https://api.spotify.com/v1/browse/new-releases?limit=0', // Endpoint para músicas populares (sem OAuth)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Músicas populares:', response.data); // Verifica a resposta da API
      this.topTracks = response.data.albums.items; // Armazena as músicas na variável
    } catch (error) {
      console.error('Erro ao buscar as músicas populares:', error);
    }
  }

  // Inicializar a página
  ngOnInit() {
    this.fetchFeaturedPlaylists(); // Chama a função para buscar playlists ao carregar a página
    this.fetchTopTracks(); // Chama a função para buscar as músicas populares ao carregar a página
  }
}
